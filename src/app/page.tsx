"use client";

import React, { useState } from "react";
import SimulationForm from "@/components/SimulationForm";
import SimulationResult from "@/components/SimulationResult";
import { generateSimulationData } from "@/utils/dataGenerator";

const HomePage: React.FC = () => {
    const [simulationData, setSimulationData] = useState<any | null>(null);

    const handleSimulation = (input: any) => {
        const data = generateSimulationData(input);
        setSimulationData(data);
    };

    return (
        <div className="space-y-8">
            <SimulationForm onSubmit={handleSimulation} />
            {simulationData && <SimulationResult data={simulationData} />}
        </div>
    );
};

export default HomePage;


