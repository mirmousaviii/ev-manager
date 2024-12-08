'use client';

import React, { useState } from 'react';
import InputForm from './components/InputForm';
import OutputDisplay from './components/OutputDisplay';
import { SimulationInput, SimulationOutput } from '@/types';

export default function Home() {
    const [outputData, setOutputData] = useState<SimulationOutput | null>(null);

    const handleSimulation = (data: SimulationInput) => {
        const simulatedOutput: SimulationOutput = {
            totalEnergy: data.chargePoints * data.carConsumption,
            peakLoad: data.chargePoints * data.chargingPower * 0.8,
            eventsPerDay: [
                { day: 'Monday', events: 30 },
                { day: 'Tuesday', events: 45 },
                { day: 'Wednesday', events: 25 },
                { day: 'Thursday', events: 35 },
                { day: 'Friday', events: 50 },
                { day: 'Saturday', events: 40 },
                { day: 'Sunday', events: 20 },
            ],
            chargePointUsage: [
                { id: 1, power: [5, 7, 11] },
                { id: 2, power: [3, 5, 9] },
                { id: 3, power: [6, 8, 10] },
            ],
        };
        setOutputData(simulatedOutput);
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-2xl space-y-6">
                <h1 className="text-4xl font-bold text-primary text-center">
                    EV Manager
                </h1>
                <p className="text-center text-secondary">
                    Manage and simulate EV charging station usage.
                </p>
                <InputForm onSubmit={handleSimulation} />
                {outputData && <OutputDisplay outputData={outputData} />}
            </div>
        </div>
    );
}
