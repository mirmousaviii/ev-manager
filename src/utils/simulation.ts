import { SimulationInputs, SimulationOutputs } from "@/types";

export const simulateCharging = (inputs: SimulationInputs): SimulationOutputs => {
    const { chargePoints, arrivalProbability, carConsumption, chargingPower } = inputs;

    // اعتبارسنجی ورودی‌ها
    if (chargePoints <= 0 || arrivalProbability <= 0 || carConsumption <= 0 || chargingPower <= 0) {
        throw new Error("All inputs must be positive numbers.");
    }

    // ۱. محاسبه کل انرژی مصرف‌شده
    const totalEnergy = chargePoints * carConsumption * (arrivalProbability / 100);

    // ۲. محاسبه توان اوج (Peak Load)
    const peakLoad = Math.min(chargePoints * chargingPower, totalEnergy / 24);

    // ۳. محاسبه تعداد رویدادها بر اساس احتمال ورود و تعداد ایستگاه‌ها
    const eventsPerDay = Array.from({ length: 7 }, (_, i) => {
        const dayName = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][i];
        const dailyEvents = Math.floor(chargePoints * (arrivalProbability / 100));
        return { day: dayName, events: dailyEvents };
    });

    // ۴. محاسبه مصرف توان در هر ایستگاه به صورت روزانه
    const chargePointUsage = Array.from({ length: chargePoints }, (_, id) => {
        const dailyPower = Array.from({ length: 7 }, () => Math.random() * chargingPower);
        return {
            id: id + 1,
            power: dailyPower.map((p) => parseFloat(p.toFixed(2))),
        };
    });

    return {
        totalEnergy,
        peakLoad,
        eventsPerDay,
        chargePointUsage,
    };
};
