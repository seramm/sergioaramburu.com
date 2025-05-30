import { Box, HStack, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import * as d3 from "d3";
import { Droplets, Thermometer } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface MeteoData {
  date: Date;
  temperature: number;
  humidity: number;
}

interface MeteoDataProps {
  data: MeteoData[];
}

export function Dashboard() {
  const [data, setData] = useState<MeteoData[]>([]);
  useEffect(() => {
    fetch("https://sergioaramburu.com/api/meteo/last_data")
      .then((res) => res.json())
      .then((data) => {
        setData(
          data.map((d: MeteoData) => ({
            ...d,
            date: new Date(d.date),
          })),
        );
      })
      .catch((err) => console.error("Error fetching meteo data", err));
  }, []);
  return (
    <>
      <Box>
        <ValuesIndicator data={data} />
      </Box>
      <Box>
        <MeteoPlot data={data} />
      </Box>
    </>
  );
}

function MeteoPlot({ data }: MeteoDataProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const currentXScale = useRef<any>(null);
  const margin = { top: 40, right: 40, bottom: 60, left: 40 };
  const width = 800;
  const height = 400;

  useEffect(() => {
    if (data.length === 0) return;

    const missingData = getMissingData(data);

    const area = (data, x) =>
      d3
        .area<MeteoData>()
        .x((d) => x(d.date))
        .y0(y_temp(0))
        .y1((d) => y_temp(d.temperature))(data);

    const line = (data, x) =>
      d3
        .line<MeteoData>()
        .x((d) => x(d.date))
        .y((d) => y_hum(d.humidity))(data);

    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date))
      .range([margin.left, width - margin.right]);

    const xAxis = d3
      .axisBottom(x)
      .tickFormat(d3.timeFormat("%d-%m %H:%M"))
      .tickSizeOuter(0);

    currentXScale.current = x;

    const y_temp = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => Math.max(d.temperature)) ?? 100])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const yAxisTemp = d3.axisLeft(y_temp);

    const y_hum = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => Math.max(d.humidity)) ?? 100])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const yAxisHum = d3.axisRight(y_hum);

    const zoom = d3
      .zoom()
      .scaleExtent([1, 48])
      .extent([
        [margin.left, 0],
        [width - margin.right, height],
      ])
      .translateExtent([
        [margin.left, -Infinity],
        [width - margin.right, Infinity],
      ])
      .on("zoom", zoomed);

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto;")
      .on("pointerenter pointermove", pointermoved)
      .on("pointerleave", pointerleft)
      .on("touchstart", (event) => event.preventDefault());

    svg
      .append("defs")
      .append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("x", margin.left)
      .attr("y", margin.top)
      .attr("width", width - margin.right - margin.left)
      .attr("height", height);

    const clip = svg.append("g").attr("clip-path", "url(#clip)");

    const pathTemp = clip
      .append("path")
      .datum(data)
      .attr("fill", "tomato")
      .attr("d", area(data, x));

    const pathMissingTemp = clip.append("g");
    missingData.forEach(([start, end]) => {
      pathMissingTemp
        .append("path")
        .datum([start, end])
        .attr("fill", "#ccc")
        .attr("d", area(data, x))
        .attr("opacity", 0.75);
    });

    const pathHum = clip
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2.5)
      .attr("d", line(data, x));

    const gx = svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(xAxis);

    gx.selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("font-size", "12px")
      .style("text-anchor", "end");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(yAxisTemp)
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .selectAll(".tick line")
          .clone()
          .attr("x2", width - margin.right - margin.left)
          .attr("stroke-opacity", 0.25),
      )
      .selectAll("text")
      .style("font-size", "14px");

    svg
      .append("g")
      .attr("transform", `translate(${width - margin.right}, 0)`)
      .call(yAxisHum)
      .call((g) => g.select(".domain").remove());

    const dayLines = clip.append("g").attr("class", "day-lines");
    drawDayLines(x);

    const tooltip = svg.append("g");
    const bisect = d3.bisector<MeteoData, Date>((d) => d.date).center;

    function formatDate(date: Date) {
      return date.toLocaleString("en", {
        month: "numeric",
        day: "numeric",
        year: "2-digit",
        hour: "numeric",
        minute: "numeric",
      });
    }

    function pointermoved(event) {
      const xz = currentXScale.current;
      const i = bisect(data, xz.invert(d3.pointer(event)[0]));

      const closestTemp = data[i].temperature;
      const closestHum = data[i].humidity;
      const tempDistance = Math.abs(y_temp(closestTemp) - d3.pointer(event)[1]);
      const humDistance = Math.abs(y_hum(closestHum) - d3.pointer(event)[1]);
      const isTempCloser = tempDistance < humDistance;

      tooltip.style("display", null);
      tooltip.attr(
        "transform",
        `translate(${xz(data[i].date)},${isTempCloser ? y_temp(closestTemp) : y_hum(closestHum)})`,
      );

      const path = tooltip
        .selectAll("path")
        .data([,])
        .join("path")
        .attr("fill", "white")
        .attr("stroke", "black");

      const text = tooltip
        .selectAll("text")
        .data([,])
        .join("text")
        .call((text) =>
          text
            .selectAll("tspan")
            .data([
              formatDate(data[i].date),
              "Temp: " + data[i].temperature + " ºC",
              "Humi: " + data[i].humidity + " %",
            ])
            .join("tspan")
            .attr("x", 0)
            .attr("y", (_, i) => `${i * 1.1}em`)
            .attr("font-weight", (_, i) => (i ? null : "bold"))
            .text((d) => d),
        );

      size(text, path);
    }

    function pointerleft() {
      tooltip.style("display", "none");
    }

    function size(text, path) {
      const { x, y, width: w, height: h } = text.node().getBBox();
      text.attr("transform", `translate(${-w / 2}, ${15 - y})`);
      path.attr(
        "d",
        `M${-w / 2 - 10},5H-5l5, -5l5, 5H${w / 2 + 10}v${h + 20}h-${w + 20}z`,
      );
    }

    function drawDayLines(xScale) {
      const dayTicks = d3.timeDay.range(
        d3.timeDay.floor(d3.min(data, (d) => d.date)!),
        d3.timeDay.ceil(d3.max(data, (d) => d.date)!),
      );

      const lines = dayLines.selectAll("line").data(dayTicks);

      lines
        .join("line")
        .attr("x1", (d) => xScale(d))
        .attr("x2", (d) => xScale(d))
        .attr("y1", margin.top)
        .attr("y2", height - margin.bottom)
        .attr("stroke", "#ccc")
        .attr("stroke-opacity", 0.6)
        .attr("stroke-dasharray", "2,2");
    }

    function zoomed(event) {
      const xz = event.transform.rescaleX(x);
      currentXScale.current = xz;
      pathTemp.attr("d", area(data, xz));
      pathHum.attr("d", line(data, xz));
      pathMissingTemp.selectAll("path").attr("d", (d: [MeteoData, MeteoData]) =>
        d3
          .area<MeteoData>()
          .x((p) => xz(p.date))
          .y0(y_temp(0))
          .y1((p) => y_temp(p.temperature))([d[0], d[1]]),
      );
      drawDayLines(xz);
      gx.call(xAxis.scale(xz));

      gx.selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("font-size", "12px")
        .style("text-anchor", "end");
    }

    svg
      .call(zoom)
      .transition()
      .duration(750)
      .call(zoom.scaleTo, 4, [x(data[data.length - 1].date), 0]);
  }, [data]);

  return <svg ref={svgRef} />;
}

function getMissingData(data: MeteoData[], maxGapMinutes = 2) {
  let result: MeteoData[][] = [];

  for (let i = 0; i < data.length; i++) {
    const point = data[i];
    const prev = data[i - 1];
    const gap =
      prev &&
      (point.date.getTime() - prev.date.getTime()) / (1000 * 60) >
        maxGapMinutes;

    if (gap) {
      result.push([prev, point]);
    }
  }
  return result;
}

function ValuesIndicator({ data }: MeteoDataProps) {
  const iconSize = useBreakpointValue({ base: 20, md: 32 });
  if (data.length === 0) return;
  const lastValues = data[data.length - 1];
  return (
    <Stack
      direction={["row", "row"]}
      py="10"
      pt="20"
      justify="center"
      align="center"
    >
      <Box
        p="5"
        mx={["1", "10"]}
        borderWidth={["3px", "5px"]}
        borderColor="lightblue.0"
        borderRadius="20px"
      >
        <HStack>
          <Box p="1" borderWidth="3px" borderRadius="50%" color="lightblue.0">
            <Thermometer size={iconSize} />
          </Box>
          <Text
            fontFamily="'Ubuntu Mono', monospace"
            textStyle={["lg", "2xl"]}
            fontWeight="bold"
          >
            {data.length > 0
              ? `${lastValues.temperature.toFixed(2)} ºC`
              : `No data`}
          </Text>
        </HStack>
      </Box>
      <Box
        p="5"
        mx={["1", "10"]}
        borderWidth={["3px", "5px"]}
        borderColor="lightblue.0"
        borderRadius="20px"
      >
        <HStack>
          <Box p="1" borderWidth="3px" borderRadius="50%" color="lightblue.0">
            <Droplets size={iconSize} />
          </Box>
          <Text
            fontFamily="'Ubuntu Mono', monospace"
            textStyle={["lg", "2xl"]}
            fontWeight="bold"
          >
            {data.length > 0
              ? `${lastValues.humidity.toFixed(2)} %`
              : `No data`}
          </Text>
        </HStack>
      </Box>
    </Stack>
  );
}
