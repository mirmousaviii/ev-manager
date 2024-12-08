export interface SimulationInput {
    chargePoints: number;
    arrivalProbability: number;
    carConsumption: number;
    chargingPower: number;
}

export interface SimulationOutput {
    totalEnergy: number;
    peakLoad: number;
    eventsPerDay: { day: string; events: number }[];
    chargePointUsage: { id: number; power: number[] }[];
}