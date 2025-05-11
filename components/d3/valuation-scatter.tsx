"use client";
import React, { useEffect } from "react";
import * as d3 from "d3";
import { useSharkTankData, mappers } from "@/lib/data";
import VisualizationModal from "@/components/d3/visualization-modal";
import { useVisualizationExpander } from "@/hooks/useVisualizationExpander";

const ValuationScatter = () => {
  const { data, isLoading, isError } = useSharkTankData(mappers.valuation);
  const {
    containerRef,
    svgRef,
    modalSvgRef,
    isModalOpen,
    openModal,
    closeModal,
    modalTitle,
  } = useVisualizationExpander({
    title: "Asked vs. Deal Valuations",
    width: 1200,
    height: 800,
  });

  useEffect(() => {
    if (isLoading || isError || !data.length || !svgRef.current) return;

    // Filter out entries without valuations and ensure values are > 0 for log scale
    const filteredData = data.filter(
      (d) => d.is_deal && d.ask_valuation > 0 && d.deal_valuation > 0
    );

    if (!filteredData.length) return;

    const width = 800;
    const height = 500;
    const margin = { top: 40, right: 40, bottom: 60, left: 80 };

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Create scales with proper domains
    const x = d3
      .scaleLinear()
      .domain([0, d3.max(filteredData, (d) => d.ask_valuation) || 0])
      .nice()
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(filteredData, (d) => d.deal_valuation) || 0])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Add diagonal reference line (y=x)
    const maxVal = Math.max(
      d3.max(filteredData, (d) => d.ask_valuation) || 0,
      d3.max(filteredData, (d) => d.deal_valuation) || 0
    );

    svg
      .append("line")
      .attr("x1", x(0))
      .attr("y1", y(0))
      .attr("x2", x(maxVal))
      .attr("y2", y(maxVal))
      .attr("stroke", "gray")
      .attr("stroke-dasharray", "4,4");

    // Add points with tooltips
    svg
      .selectAll("circle")
      .data(filteredData)
      .join("circle")
      .attr("cx", (d) => x(d.ask_valuation))
      .attr("cy", (d) => y(d.deal_valuation))
      .attr("r", 5)
      .attr("fill", "steelblue")
      .attr("opacity", 0.6)
      .append("title")
      .text(
        (d) =>
          `${d.name}\nAsked: $${d3.format(",.0f")(
            d.ask_valuation
          )}\nGot: $${d3.format(",.0f")(d.deal_valuation)}`
      );

    // Add axes with better formatting
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(8)
          .tickFormat((d) => `$${d3.format(",.0f")(d)}`)
      );

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(
        d3
          .axisLeft(y)
          .ticks(8)
          .tickFormat((d) => `$${d3.format(",.0f")(d)}`)
      );

    // Add labels
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height - 20)
      .attr("text-anchor", "middle")
      .text("Asked Valuation ($)");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", 30)
      .attr("text-anchor", "middle")
      .text("Deal Valuation ($)");

    // Add title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .attr("font-size", "16px")
      .attr("font-weight", "bold")
      .text("Asked vs. Deal Valuations");
  }, [data, isLoading, isError]);

  if (isLoading) return <div>Loading data...</div>;
  if (isError) return <div>Error loading data. Please try again later.</div>;
  if (!data || data.length === 0)
    return <div>No data available for analysis.</div>;

  return (
    <div>
      <div
        ref={containerRef}
        className="cursor-pointer border rounded-lg p-2 bg-white shadow hover:shadow-md transition-shadow"
        onClick={openModal}
        title="Click to expand"
      >
        <svg ref={svgRef} width={800} height={500}></svg>
      </div>

      {/* Modal for expanded view */}
      <VisualizationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalTitle}
      >
        <svg ref={modalSvgRef} width={1200} height={800}></svg>
      </VisualizationModal>
    </div>
  );
};

export default ValuationScatter;
