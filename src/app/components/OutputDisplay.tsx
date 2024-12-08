import React from "react";
import { SimulationOutput } from "@/types";

interface OutputDisplayProps {
    outputData: SimulationOutput;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ outputData }) => {
    return (
        <div className="p-4 bg-white rounded shadow-md space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Simulation Results</h2>
            <p>
                <strong>Total Energy Charged:</strong> {outputData.totalEnergy} kWh
            </p>
            <p>
                <strong>Peak Load:</strong> {outputData.peakLoad} kW
            </p>
            <div>
                <h3 className="text-lg font-medium text-gray-700">Charging Events Per Day:</h3>
                <ul className="list-disc list-inside">
                    {outputData.eventsPerDay.map((event) => (
                        <li key={event.day}>
                            {event.day}: {event.events} events
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3 className="text-lg font-medium text-gray-700">Charge Point Usage:</h3>
                <ul className="list-disc list-inside">
                    {outputData.chargePointUsage.map((point) => (
                        <li key={point.id}>
                            Point {point.id}: {point.power.join(", ")} kW
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default OutputDisplay;
