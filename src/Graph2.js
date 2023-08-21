import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const ForceGraph = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const nodes = [
      { id: "A", x: 100, y: 100 },
      { id: "B", x: 200, y: 200 },
      { id: "C", x: 300, y: 300 },
      { id: "D", x: 400, y: 400 },
    ];

    let links = [
      { source: "A", target: "C" },
      { source: "C", target: "A" },
      { source: "B", target: "C" },
      { source: "D", target: "A" },
    ];

    links = links.map((link) => ({
      source: nodes[nodes.findIndex((node) => link.source === node.id)],
      target: nodes[nodes.findIndex((node) => link.target === node.id)],
    }));

    const svg = d3.select(svgRef.current);

    const node = svg
      .select("#node")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .each(function (d) {
        d3.select(this).append("circle").attr("r", 5).style("fill", "red");
        d3.select(this)
          .append("text")
          .text((d) => d.name);
      });

    const link = svg
      .select("#link")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "black");

    function drawNodes() {
      node.attr("transform", (d) => "translate(" + [d.x, d.y] + ")");
    }

    function drawLines() {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);
    }

    drawNodes();
    drawLines();
  }, []);

  return (
    <svg ref={svgRef} width="500" height="500">
      <g id="link" />
      <g id="node" />
    </svg>
  );
};

export default ForceGraph;
