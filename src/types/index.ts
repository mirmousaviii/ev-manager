export interface ChargePointConfig {
    power: number; // Charging power for each charge point
}

export interface SimulationInput {
    chargePoints: number;
    chargePointConfigs: { power: number }[];
    arrivalProbability: number; // Percentage (20-200%)
    carConsumption: number; // kWh
}

export interface SimulationData {
    hourlyCharging: number[][];
    totalEnergy: number; // kWh
    chargingEvents: number; // Daily events (for backward compatibility)
    peakPower: number; // kW
    dailyEvents: number;
    weeklyEvents: number;
    monthlyEvents: number;
    yearlyEvents: number;
}