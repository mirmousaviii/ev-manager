import { SimulationInput, SimulationData } from "@/types";

// Generate simulation data based on the input
export const generateSimulationData = (input: SimulationInput): SimulationData => {
    const { chargePointConfigs, arrivalProbability } = input;

    // Number of charge points
    const chargePoints = chargePointConfigs.length;

    // Calculate daily charging events
    const dailyEvents = chargePoints * 24 * (arrivalProbability / 100);

    // Calculate weekly, monthly, and yearly charging events
    const weeklyEvents = dailyEvents * 7;
    const monthlyEvents = dailyEvents * 30;
    const yearlyEvents = dailyEvents * 365;

    // Generate hourly charging data for each charge point
    const hourlyCharging = chargePointConfigs.map((config) =>
        Array.from({ length: 24 }, () => {
            const randomFactor = Math.random() * (arrivalProbability / 100);
            return config.power * randomFactor;
        })
    );

    // Calculate total energy charged
    const totalEnergy = hourlyCharging.flat().reduce((acc, val) => acc + val, 0);

    // Calculate peak power demand
    const peakPower = Math.max(...hourlyCharging.flat());

    return {
        hourlyCharging,
        totalEnergy,
        chargingEvents: Math.round(dailyEvents), // Keep daily for simplicity
        peakPower,
        dailyEvents: Math.round(dailyEvents),
        weeklyEvents: Math.round(weeklyEvents),
        monthlyEvents: Math.round(monthlyEvents),
        yearlyEvents: Math.round(yearlyEvents),
    };
};
