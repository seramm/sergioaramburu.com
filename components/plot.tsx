import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

interface MeteoData {
  date: Date;
  temperature: number;
  humidity: number;
}

export default function BasicPlot() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [data, setData] = useState<MeteoData[]>([]);

  useEffect(() => {
    fetch("https://sergioaramburu.com/api/meteo/last_data")
      .then((res) => res.json())
      .then((data) => {
        const parsed = data.map((d: MeteoData) => ({
          ...d,
          date: new Date(d.date),
        }));
        setData(parsed);
      })
      .catch((err) => console.error("Error fetching meteo data", err));
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    const svg = d3.select(svgRef.current);

    const margin = { top: 20, right: 40, bottom: 40, left: 40 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date))
      .range([0, width]);

    const y_temp = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => Math.max(d.temperature)) ?? 100])
      .nice()
      .range([height, 0]);

    const y_hum = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => Math.max(d.humidity)) ?? 100])
      .nice()
      .range([height, 0]);

    svg
      .attr("width", "100%")
      .attr("height", "100%")
      .attr(
        "viewBox",
        `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`,
      )
      .attr("preserveAspectRatio", "xMidYMid meet")
      .style("overflow", "visible")
      .attr("transform", `translate(${margin.left},${margin.bottom})`)
      .on("pointerenter pointermove", pointermoved)
      .on("pointerleave", pointerleft)
      .on("touchstart", (event) => event.preventDefault());

    const g = svg.append("g");

    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(
        d3
          .axisBottom(x)
          .tickFormat((d) => d3.timeFormat("%b %d, %H:%M")(d as Date)),
      )
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    g.append("g")
      .call(d3.axisLeft(y_temp))
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .selectAll(".tick line")
          .clone()
          .attr("x2", width)
          .attr("stroke-opacity", 0.1),
      );

    g.append("g")
      .attr("transform", `translate(${width}, 0)`)
      .call(d3.axisRight(y_hum))
      .call((g) => g.select(".domain").remove());

    g.append("g")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("fill", "none")
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", (d) => x(d.date))
      .attr("cy", (d) => y_hum(d.humidity))
      .attr("r", 1);

    g.append("g")
      .attr("stroke", "tomato")
      .attr("stroke-width", 1.5)
      .attr("fill", "none")
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", (d) => x(d.date))
      .attr("cy", (d) => y_temp(d.temperature))
      .attr("r", 1);

    const tooltip = g.append("g");

    function formatDate(date: Date) {
      return date.toLocaleString("en", {
        month: "numeric",
        day: "numeric",
        year: "2-digit",
        hour: "numeric",
        minute: "numeric",
      });
    }

    const bisect = d3.bisector<MeteoData, Date>((d) => d.date).center;
    function pointermoved(event) {
      const i = bisect(data, x.invert(d3.pointer(event)[0]));

      const closestTemp = data[i].temperature;
      const closestHum = data[i].humidity;

      const tempDistance = Math.abs(y_temp(closestTemp) - d3.pointer(event)[1]);
      const humDistance = Math.abs(y_hum(closestHum) - d3.pointer(event)[1]);

      const isTempCloser = tempDistance < humDistance;

      tooltip.style("display", null);
      tooltip.attr(
        "transform",
        `translate(${x(data[i].date)},${isTempCloser ? y_temp(closestTemp) : y_hum(closestHum)})`,
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
              "Temp: " + closestTemp + " ºC",
              "Hum: " + closestHum + " %",
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
      text.attr("transform", `translate(${-w / 2},${15 - y})`);
      path.attr(
        "d",
        `M${-w / 2 - 10},5H-5l5,-5l5,5H${w / 2 + 10}v${h + 20}h-${w + 20}z`,
      );
    }
  }, [data]);

  return <svg ref={svgRef} />;
}
