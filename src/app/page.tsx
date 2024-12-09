"use client";

import React, { useState } from "react";
import InputForm from "@/components/InputForm";
import OutputDisplay from "@/components/OutputDisplay";
import { simulateCharging } from "@/utils/simulation";
import { SimulationInputs, SimulationOutputs } from "@/types";

const HomePage: React.FC = () => {
    const [outputData, setOutputData] = useState<SimulationOutputs | null>(null);

    const handleSimulation = (inputs: SimulationInputs) => {
        // Simulate the charging process
        const results = simulateCharging(inputs);
        setOutputData(results);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
            <h1 className="text-4xl font-bold text-blue-600 text-center mb-8">
                EV Manager
            </h1>
            <p className="text-center text-gray-700 mb-8">
                Manage and simulate EV charging station usage efficiently.
            </p>
            <div className="w-full max-w-3xl space-y-6">
                <InputForm onSubmit={handleSimulation} />

                {outputData && <OutputDisplay data={outputData} />}
            </div>
        </div>
    );
};

export default HomePage;