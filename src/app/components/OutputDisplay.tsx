import React from "react";
import { SimulationOutputs } from "@/types";

type OutputDisplayProps = {
    data: SimulationOutputs;
};

const OutputDisplay: React.FC<OutputDisplayProps> = ({ data }) => {

    // Calculate the total number of events per day, week, month, and year
    const totalEventsPerDay = data.eventsPerDay.reduce((sum, event) => sum + event.events, 0);
    const totalEventsPerWeek = totalEventsPerDay * 7; // a week
    const totalEventsPerMonth = totalEventsPerDay * 30; // a month (assuming 30 days)
    const totalEventsPerYear = totalEventsPerDay * 365; // a year

    return (
        <div className="p-6 bg-white rounded shadow-md space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Simulation Results</h2>

            {/* The charging values (in kW) per charge point at a useful aggregation level */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800">Charge Point Usage:</h3>
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">Point ID</th>
                        <th className="border border-gray-300 px-4 py-2">Total Power (kW)</th>
                        <th className="border border-gray-300 px-4 py-2">Average Power (kW)</th>
                        <th className="border border-gray-300 px-4 py-2">Max Power (kW)</th>
                        <th className="border border-gray-300 px-4 py-2">Min Power (kW)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.chargePointUsage.map((point) => {
                        const totalPower = point.power.reduce((sum, p) => sum + p, 0);
                        const averagePower = totalPower / point.power.length;
                        const maxPower = Math.max(...point.power);
                        const minPower = Math.min(...point.power);

                        return (
                            <tr key={point.id} className="text-center">
                                <td className="border border-gray-300 px-4 py-2">{point.id}</td>
                                <td className="border border-gray-300 px-4 py-2">{totalPower.toFixed(2)}</td>
                                <td className="border border-gray-300 px-4 py-2">{averagePower.toFixed(2)}</td>
                                <td className="border border-gray-300 px-4 py-2">{maxPower.toFixed(2)}</td>
                                <td className="border border-gray-300 px-4 py-2">{minPower.toFixed(2)}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>

            <hr className="my-4 border-t border-gray-300"/>

            {/* Exemplary Day */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800">Exemplary Day:</h3>
                <ul className="list-disc pl-5 text-gray-700">
                    {data.eventsPerDay.map((event, index) => (
                        <li key={index}>
                            <strong>{event.day}:</strong> {event.events} events
                        </li>
                    ))}
                </ul>
            </div>

            <hr className="my-4 border-t border-gray-300"/>

            {/* Total Energy Charged */}
            <p className="text-gray-700">
                <strong>Total Energy Charged:</strong> {data.totalEnergy.toFixed(2)} kWh
            </p>

            <hr className="my-4 border-t border-gray-300"/>

            {/* The number of charging events per year/month/week/day */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800">Charging Events:</h3>
                <ul className="list-disc pl-5 text-gray-700">
                    <li><strong>Per Year:</strong> {totalEventsPerYear} events</li>
                    <li><strong>Per Month:</strong> {totalEventsPerMonth} events</li>
                    <li><strong>Per Week:</strong> {totalEventsPerWeek} events</li>
                    <li><strong>Per Day:</strong> {totalEventsPerDay} events</li>
                </ul>
            </div>
        </div>
    );
};

export default OutputDisplay;
