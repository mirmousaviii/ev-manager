import React, {useEffect, useRef} from "react";
import * as d3 from "d3";
import {SimulationData, SimulationInput} from "@/types";

const SimulationResult: React.FC<{ data: SimulationData, inputData: SimulationInput }> = ({data, inputData}) => {
    const chartRef = useRef<SVGSVGElement | null>(null);
    const heatmapRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        // Bar Chart Rendering
        if (chartRef.current) {
            const svg = d3.select(chartRef.current);
            svg.selectAll("*").remove();

            const width = 800;
            const height = 400;
            const margin = {top: 20, right: 30, bottom: 50, left: 60};
            const chartWidth = width - margin.left - margin.right;
            const chartHeight = height - margin.top - margin.bottom;

            const x = d3
                .scaleBand()
                .domain(d3.range(24).map(String))
                .range([0, chartWidth])
                .padding(0.1);

            const y = d3
                .scaleLinear()
                .domain([0, d3.max(data.hourlyCharging.flat()) || 0])
                .nice()
                .range([chartHeight, 0]);

            const chart = svg
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

            chart
                .append("g")
                .attr("transform", `translate(0,${chartHeight})`)
                .call(d3.axisBottom(x).tickFormat((d) => `${d}:00`))
                .attr("font-size", "12px");

            chart
                .append("g")
                .call(d3.axisLeft(y))
                .attr("font-size", "12px");

            chart
                .selectAll(".bar")
                .data(data.hourlyCharging.flat())
                .join("rect")
                .attr("class", "bar")
                .attr("x", (_, i) => x(String(i % 24)) || 0)
                .attr("y", (d) => y(d))
                .attr("height", (d) => chartHeight - y(d))
                .attr("width", x.bandwidth())
                .attr("fill", "steelblue");

            svg
                .append("text")
                .attr("x", width / 2)
                .attr("y", margin.top / 2)
                .attr("text-anchor", "middle")
                .attr("font-size", "16px")
                .attr("font-weight", "bold");
        }

        // Heatmap Rendering
        if (heatmapRef.current) {
            const svg = d3.select(heatmapRef.current);
            svg.selectAll("*").remove();

            const width = 800;
            const height = 400;
            const margin = {top: 20, right: 30, bottom: 50, left: 60};
            const chartWidth = width - margin.left - margin.right;
            const chartHeight = height - margin.top - margin.bottom;

            const hours = d3.range(24);
            const chargePoints = d3.range(data.hourlyCharging.length);

            const x = d3
                .scaleBand()
                .domain(hours.map(String))
                .range([0, chartWidth])
                .padding(0.05);

            const y = d3
                .scaleBand()
                .domain(chargePoints.map(String))
                .range([0, chartHeight])
                .padding(0.05);

            const color = d3
                .scaleSequential(d3.interpolateBlues)
                .domain([0, d3.max(data.hourlyCharging.flat()) || 0]);

            const heatmap = svg
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

            heatmap
                .selectAll("rect")
                .data(data.hourlyCharging.flatMap((row, i) =>
                    row.map((value, j) => ({
                        x: j,
                        y: i,
                        value,
                    }))
                ))
                .join("rect")
                .attr("x", (d) => x(String(d.x)) || 0)
                .attr("y", (d) => y(String(d.y)) || 0)
                .attr("width", x.bandwidth())
                .attr("height", y.bandwidth())
                .attr("fill", (d) => color(d.value));

            heatmap
                .append("g")
                .attr("transform", `translate(0,${chartHeight})`)
                .call(d3.axisBottom(x).tickFormat((d) => `${d}:00`))
                .attr("font-size", "12px");

            heatmap
                .append("g")
                .call(d3.axisLeft(y).tickFormat((d) => `CP ${+d + 1}`))
                .attr("font-size", "12px");

            svg
                .append("text")
                .attr("x", width / 2)
                .attr("y", margin.top / 2)
                .attr("text-anchor", "middle")
                .attr("font-size", "16px")
                .attr("font-weight", "bold");
        }
    }, [data]);

    return (
        <div className="mt-4 space-y-6 p-8 bg-white shadow-md rounded-lg max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 text-center">Simulation Results</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="col-span-1 bg-white shadow-md p-4">
                    <h3 className="text-lg font-semibold text-gray-700">Simulation Data</h3>
                    <ul className="mt-4 space-y-2 text-gray-600">
                        <li>Charge Points: <strong>{inputData.chargePoints}</strong></li>
                        <li>Average Charging
                            Power: <strong>{(inputData.chargePointConfigs.reduce((acc, config) => acc + config.power, 0) / inputData.chargePoints).toFixed(2)} kW</strong>
                        </li>
                        <li>Sum of Charging
                            Power: <strong>{inputData.chargePointConfigs.reduce((acc, config) => acc + config.power, 0)} kW</strong>
                        </li>
                        <li>Arrival Probability: <strong>{inputData.arrivalProbability}%</strong></li>
                        <li>Car Consumption: <strong>{inputData.carConsumption} kWh</strong></li>
                    </ul>
                </div>

                <div className="col-span-1 bg-white shadow-md p-4">
                    <h3 className="text-lg font-semibold text-gray-700">Summary</h3>
                    <ul className="mt-4 space-y-2 text-gray-600">
                        <li>Total Energy Charged: <strong>{data.totalEnergy.toFixed(2)}</strong> kWh</li>
                        <li>Peak Power Demand: <strong>{data.peakPower.toFixed(2)}</strong> kW</li>
                        <li>Daily Charging Events: <strong>{data.dailyEvents}</strong></li>
                        <li>Weekly Charging Events: <strong>{data.weeklyEvents}</strong></li>
                        <li>Monthly Charging Events: <strong>{data.monthlyEvents}</strong></li>
                        <li>Yearly Charging Events: <strong>{data.yearlyEvents}</strong></li>
                    </ul>
                </div>
            </div>

            <div className="p-4 bg-white shadow-md">
                <h3 className="text-lg font-semibold text-gray-700">Charging Values (kW)</h3>
                <svg
                    ref={chartRef}
                    viewBox={`0 0 800 400`}
                    preserveAspectRatio="xMidYMid meet"
                    className="w-full h-auto"
                ></svg>
            </div>

            <div className="p-4 bg-white shadow-md">
                <h3 className="text-lg font-semibold text-gray-700">Charging Heatmap</h3>
                <svg
                    ref={heatmapRef}
                    viewBox={`0 0 800 400`}
                    preserveAspectRatio="xMidYMid meet"
                    className="w-full h-auto"
                ></svg>
            </div>
        </div>
    );
};

export default SimulationResult;
