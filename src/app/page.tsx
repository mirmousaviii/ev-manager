"use client";

import React, { useState } from "react";
import SimulationForm from "@/app/components/SimulationForm";
import SimulationResult from "@/app/components/SimulationResult";
import { generateSimulationData } from "@/utils/dataGenerator";
import { SimulationInput, SimulationData } from "@/types";

const Page: React.FC = () => {
    const [simulationData, setSimulationData] = useState<SimulationData | null>(null);
    const [simulationInput, setSimulationInput] = useState<SimulationInput | null>(null);

    const handleFormSubmit = (input: SimulationInput) => {
        setSimulationInput(input);
        const data = generateSimulationData(input);
        setSimulationData(data);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <SimulationForm onSubmit={handleFormSubmit} />
            {simulationData && <SimulationResult
                data={simulationData as SimulationData}
                inputData={simulationInput as SimulationInput}
            />}
        </div>
    );
};

export default Page;



