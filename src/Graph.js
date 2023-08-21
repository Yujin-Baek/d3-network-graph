import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const ForceGraph = () => {
  const svgRef = useRef();

  const nodes = [
    { id: "A" },
    { id: "B" },
    { id: "C" },
    { id: "D" },
    { id: "E" },
    { id: "F" },
    { id: "G" },
  ];

  const links = [
    { source: "A", target: "B" },
    { source: "B", target: "D" },
    { source: "C", target: "E" },
    { source: "D", target: "B" },
    { source: "E", target: "B" },
    { source: "E", target: "D" },
    { source: "F", target: "A" },
    { source: "G", target: "D" },
  ];
  useEffect(() => {
    const width = 1000;
    const height = 600;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width) // SVG의 너비 설정
      .attr("height", height); // SVG의 높이 설정

    const link = svg
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "black")
      .attr("stroke-width", 1);

    const node = svg
      .selectAll("g")
      .data(nodes)
      .join("g")
      .each(function (d) {
        d3.select(this).append("circle").attr("r", 6).attr("fill", "skyblue");
        d3.select(this)
          .append("text")
          .text((d) => d.id)
          .attr("x", -5)
          .attr("y", 5);
      });

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3.forceLink(links).id((d) => d.id)
      )
      .force("charge", d3.forceManyBody().strength(-100))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .on("tick", () => {
        link
          .attr("x1", (d) => d.source.x)
          .attr("y1", (d) => d.source.y)
          .attr("x2", (d) => d.target.x)
          .attr("y2", (d) => d.target.y);
        node.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
      });
  }, [nodes, links]);

  return <svg ref={svgRef} />;
};

export default ForceGraph;
