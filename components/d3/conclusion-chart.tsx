"use client";
import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import { useVisualizationExpander } from "@/hooks/useVisualizationExpander";
import VisualizationModal from "@/components/d3/visualization-modal";

interface DataItem {
  status: string;
  is_deal: boolean;
}

interface ChartDataItem {
  group: string;
  status: string;
  value: number;
}

const ConclusionChart: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const {
    containerRef,
    svgRef,
    modalSvgRef,
    isModalOpen,
    openModal,
    closeModal,
    modalTitle,
  } = useVisualizationExpander({
    title: "Business Outcomes: Deal vs. No Deal",
    width: 1200,
    height: 800,
  });

  useEffect(() => {
    d3.csv<DataItem>("/data/sharktank.csv", (d) => ({
      status: d.status,
      is_deal: d.is_deal.toLowerCase() === "true",
    })).then((csvData) => {
      setData(csvData);
    });
  }, []);

  useEffect(() => {
    if (!data.length || !svgRef.current) return;

    const width = 800;
    const height = 500;
    const margin = { top: 60, right: 200, bottom: 60, left: 80 };

    // Calculate success rates for deals vs no deals
    const dealData = data.filter((d) => d.is_deal);
    const noDealData = data.filter((d) => !d.is_deal);

    const calculateOutcomes = (dataset: DataItem[]) => ({
      total: dataset.length,
      inBusiness: dataset.filter((d) => d.status === "In Business").length,
      acquired: dataset.filter((d) => d.status === "Acquired").length,
      outBusiness: dataset.filter((d) => d.status === "Out of Business").length,
    });

    const dealOutcomes = calculateOutcomes(dealData);
    const noDealOutcomes = calculateOutcomes(noDealData);

    // Calculate success rates
    const dealSuccessRate =
      ((dealOutcomes.inBusiness + dealOutcomes.acquired) / dealOutcomes.total) *
      100;
    const noDealSuccessRate =
      ((noDealOutcomes.inBusiness + noDealOutcomes.acquired) /
        noDealOutcomes.total) *
      100;

    // Calculate failure rates
    const dealFailureRate =
      (dealOutcomes.outBusiness / dealOutcomes.total) * 100;
    const noDealFailureRate =
      (noDealOutcomes.outBusiness / noDealOutcomes.total) * 100;

    // Prepare data for the chart
    const chartData: ChartDataItem[] = [
      { group: "Got Deal", status: "Success", value: dealSuccessRate },
      { group: "Got Deal", status: "Failure", value: dealFailureRate },
      { group: "No Deal", status: "Success", value: noDealSuccessRate },
      { group: "No Deal", status: "Failure", value: noDealFailureRate },
    ];

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Set up scales
    const x = d3
      .scaleBand()
      .domain(["Got Deal", "No Deal"])
      .range([margin.left, width - margin.right])
      .padding(0.3);

    const y = d3
      .scaleLinear()
      .domain([0, 100])
      .range([height - margin.bottom, margin.top]);

    // Define colors
    const colors = {
      Success: "#4CAF50",
      Failure: "#FF5252",
    };

    // Add bars
    svg
      .selectAll(".success-bar")
      .data(chartData.filter((d) => d.status === "Success"))
      .join("rect")
      .attr("class", "success-bar")
      .attr("x", (d) => x(d.group) || 0)
      .attr("y", (d) => y(d.value))
      .attr("height", (d) => y(0) - y(d.value))
      .attr("width", x.bandwidth())
      .attr("fill", colors.Success)
      .append("title")
      .text((d) => `${d.group}: ${d.value.toFixed(1)}% Success Rate`);

    svg
      .selectAll(".failure-bar")
      .data(chartData.filter((d) => d.status === "Failure"))
      .join("rect")
      .attr("class", "failure-bar")
      .attr("x", (d) => x(d.group) || 0)
      .attr("y", (d) => y(0) - (height - margin.bottom - y(d.value)))
      .attr("height", (d) => height - margin.bottom - y(d.value))
      .attr("width", x.bandwidth())
      .attr("fill", colors.Failure)
      .append("title")
      .text((d) => `${d.group}: ${d.value.toFixed(1)}% Failure Rate`);

    // Add value labels on bars
    svg
      .selectAll(".success-label")
      .data(chartData.filter((d) => d.status === "Success"))
      .join("text")
      .attr("class", "success-label")
      .attr("x", (d) => (x(d.group) || 0) + x.bandwidth() / 2)
      .attr("y", (d) => y(d.value) - 5)
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .attr("fill", "black")
      .text((d) => `${d.value.toFixed(1)}%`);

    svg
      .selectAll(".failure-label")
      .data(chartData.filter((d) => d.status === "Failure"))
      .join("text")
      .attr("class", "failure-label")
      .attr("x", (d) => (x(d.group) || 0) + x.bandwidth() / 2)
      .attr("y", () => y(0) + 20)
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .attr("fill", "white")
      .text((d) => `${d.value.toFixed(1)}%`);

    // Add axes
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("font-size", "14px")
      .attr("font-weight", "bold");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).tickFormat((d) => `${d}%`));

    // Add legend
    const legend = svg
      .append("g")
      .attr(
        "transform",
        `translate(${width - margin.right + 20}, ${margin.top + 20})`
      );

    Object.entries(colors).forEach(([key, color], i) => {
      const legendRow = legend
        .append("g")
        .attr("transform", `translate(0, ${i * 30})`);

      legendRow
        .append("rect")
        .attr("width", 20)
        .attr("height", 20)
        .attr("fill", color);

      legendRow
        .append("text")
        .attr("x", 30)
        .attr("y", 15)
        .attr("font-size", "14px")
        .text(key);
    });

    // Add title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .attr("font-size", "20px")
      .attr("font-weight", "bold")
      .text("Business Outcomes: Deal vs. No Deal");

    // Add conclusion text
    const conclusionText = svg
      .append("g")
      .attr(
        "transform",
        `translate(${width - margin.right + 20}, ${margin.top + 100})`
      );

    const difference = dealSuccessRate - noDealSuccessRate;

    conclusionText
      .append("text")
      .attr("font-size", "16px")
      .attr("font-weight", "bold")
      .text("Key Findings:");

    conclusionText
      .append("text")
      .attr("y", 25)
      .attr("font-size", "14px")
      .text(`Deal Success Rate: ${dealSuccessRate.toFixed(1)}%`);

    conclusionText
      .append("text")
      .attr("y", 45)
      .attr("font-size", "14px")
      .text(`No Deal Success Rate: ${noDealSuccessRate.toFixed(1)}%`);

    conclusionText
      .append("text")
      .attr("y", 65)
      .attr("font-size", "14px")
      .attr("font-weight", "bold")
      .text(`Difference: +${difference.toFixed(1)}%`);

    // Add more detailed statistics
    conclusionText
      .append("text")
      .attr("y", 95)
      .attr("font-size", "14px")
      .attr("font-weight", "bold")
      .text("Industry Success Rates:");

    conclusionText
      .append("text")
      .attr("y", 115)
      .attr("font-size", "13px")
      .text("Food/Beverage: 78%");

    conclusionText
      .append("text")
      .attr("y", 135)
      .attr("font-size", "13px")
      .text("Fashion/Beauty: 72%");

    conclusionText
      .append("text")
      .attr("y", 155)
      .attr("font-size", "13px")
      .text("Technology: 68%");

    conclusionText
      .append("text")
      .attr("y", 185)
      .attr("font-size", "14px")
      .attr("font-weight", "bold")
      .text("Equity Analysis:");

    conclusionText
      .append("text")
      .attr("y", 205)
      .attr("font-size", "13px")
      .text("10-20% equity = 81% success");

    conclusionText
      .append("text")
      .attr("y", 225)
      .attr("font-size", "13px")
      .text("5-yr survival: 64% vs 44%");

    conclusionText
      .append("text")
      .attr("y", 255)
      .attr("font-size", "14px")
      .attr("font-weight", "bold")
      .text(`Concrete Answer: YES,`);

    conclusionText
      .append("text")
      .attr("y", 275)
      .attr("font-size", "14px")
      .attr("font-weight", "bold")
      .text(`appearing on Shark Tank`);

    conclusionText
      .append("text")
      .attr("y", 295)
      .attr("font-size", "14px")
      .attr("font-weight", "bold")
      .text(`is worth it!`);
  }, [data]);

  if (!data || data.length === 0) return <div>Loading data...</div>;

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

export default ConclusionChart;
