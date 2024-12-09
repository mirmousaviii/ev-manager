export type SimulationInputs = {
    chargePoints: number;
    arrivalProbability: number;
    carConsumption: number;
    chargingPower: number;
};

export type SimulationOutputs = {
    totalEnergy: number;
    peakLoad: number;
    eventsPerDay: { day: string; events: number }[];
    chargePointUsage: { id: number; power: number[] }[];
};