import React from "react";
import { SimulationData } from "@/types";

const SimulationResult: React.FC<{ data: SimulationData }> = ({ data }) => {
    //The charging values (in kW) per chargepoint at a useful aggregation level
    // An exemplary day
    // The total energy charged (in kWh)
    // The number of charging events per year/month/week/day
    // The amount of charging events/actual max power demand/energy consumed per day/week/month as a bar chart/heatmap

    return (
        <div className="p-4 bg-white rounded shadow-md space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Simulation Results</h2>
            <p>
                <strong>Total Energy Charged:</strong> {data.totalEnergy} kWh
            </p>
            <p>
                <strong>Peak Power:</strong> {data.peakPower} kW
            </p>
            <p>
                <strong>Charging Events:</strong> {data.chargingEvents}
            </p>
        </div>
    );
};

export default SimulationResult;
