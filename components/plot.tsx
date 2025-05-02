import * as d3 from "d3";
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
      <TempAreaPlot data={data} />
    </>
  );
}

function TempAreaPlot({ data }: MeteoDataProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const margin = { top: 40, right: 40, bottom: 60, left: 40 };
  const width = 800;
  const height = 400;

  useEffect(() => {
    if (data.length === 0) return;

    const area = (data, x) =>
      d3
        .area<MeteoData>()
        .x((d) => x(d.date))
        .y0(y(0))
        .y1((d) => y(d.temperature))(data);

    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date))
      .range([margin.left, width - margin.right]);

    const xAxis = d3.axisBottom(x).tickFormat(d3.timeFormat("%d-%m %H:%M")).tickSizeOuter(0);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => Math.max(d.temperature)) ?? 100])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const yAxis = d3.axisLeft(y);

    const zoom = d3
      .zoom()
      .scaleExtent([1, 32])
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
      .attr("style", "max-width: 100%; height: auto;");

    svg
      .append("defs")
      .append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("x", margin.left)
      .attr("y", margin.top)
      .attr("width", width)
      .attr("height", height);
    const clip = svg.append("g").attr("clip-path", "url(#clip)");

    const path = clip
      .append("path")
      .datum(data)
      .attr("fill", "tomato")
      .attr("d", area(data, x));

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
      .call(yAxis)
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .selectAll(".tick line")
          .clone()
          .attr("x2", width - margin.right)
          .attr("stroke-opacity", 0.1),
      )
      .selectAll("text")
      .style("font-size", "14px");

    function zoomed(event) {
      const xz = event.transform.rescaleX(x);
      path.attr("d", area(data, xz));
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
      .call(zoom.scaleTo, 4, [x(0), 0]);
  }, [data]);

  return <svg ref={svgRef} />;
}
