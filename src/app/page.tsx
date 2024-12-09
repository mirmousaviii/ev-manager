"use client";

import React, { useState } from "react";
import Form from "@/components/Form";
import Chart from "@/components/Chart";
import { generateSimulationData } from "@/utils/dataGenerator";
import { SimulationInput, SimulationData } from "@/types";

const HomePage: React.FC = () => {
    const [data, setData] = useState<SimulationData | null>(null);

    const handleSimulation = (input: SimulationInput) => {
        const simulatedData = generateSimulationData(input);
        setData(simulatedData);
    };

    return (
        <div>
            <Form onSubmit={handleSimulation} />
            {data && <Chart data={data} />}
        </div>
    );
};

export default HomePage;

