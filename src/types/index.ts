export interface ChargePointConfig {
    power: number; // Charging power for each charge point
}

export interface SimulationInput {
    chargePoints: number; // Total number of charge points
    chargePointConfigs: ChargePointConfig[]; // Array of charge point configurations
    arrivalProbability: number; // Multiplier for arrival probability (20–200%)
    carConsumption: number; // Consumption of the cars (kWh)
}

export interface SimulationData {
    hourlyCharging: number[]; // Hourly charging data
    totalEnergy: number; // Total energy charged (kWh)
    chargingEvents: number; // Total number of charging events
    peakPower: number; // Peak power demand (kW)
}
