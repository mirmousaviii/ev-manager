import { SimulationInput, SimulationData } from "@/types";

// Generate simulation data based on the input
export const generateSimulationData = (input: SimulationInput): SimulationData => {
    const { chargePointConfigs, arrivalProbability, carConsumption } = input;

    // Generate hourly charging data for each charge point
    const hourlyCharging = chargePointConfigs.map((config) =>
        Array.from({ length: 24 }, () => Math.random() * config.power * (arrivalProbability / 100))
    );

    const totalEnergy = hourlyCharging.flat().reduce((acc, val) => acc + val, 0);
    const peakPower = Math.max(...hourlyCharging.flat());
    const chargingEvents = chargePointConfigs.length * Math.round(arrivalProbability / 10); // Example

    return {
        hourlyCharging: hourlyCharging.flat(), // Flattened for visualization
        totalEnergy,
        chargingEvents,
        peakPower,
    };
};
