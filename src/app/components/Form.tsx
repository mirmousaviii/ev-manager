import React, { useState } from "react";
import { SimulationInput, ChargePointConfig } from "@/types";

const Form: React.FC<{ onSubmit: (input: SimulationInput) => void }> = ({ onSubmit }) => {
    const MAX_CHARGE_POINTS = 100; // Maximum number of charge points allowed
    const [chargePoints, setChargePoints] = useState<number>(6); // Default: 6 charge points
    const [defaultPower, setDefaultPower] = useState<number>(11); // Default power per charge point
    const [chargePointConfigs, setChargePointConfigs] = useState<ChargePointConfig[]>(
        Array(6).fill({ power: 11 })
    ); // Default configuration for charge points
    const [arrivalProbability, setArrivalProbability] = useState<number>(100); // Default arrival probability
    const [carConsumption, setCarConsumption] = useState<number>(18); // Default car consumption

    const [isChargePointConfigOpen, setIsChargePointConfigOpen] = useState<boolean>(true); // Toggle state for Charge Point Configuration

    const [errors, setErrors] = useState<{ [key: string]: string }>({}); // Error messages

    // Handle toggle for Charge Point Configuration section
    const toggleChargePointConfig = () => {
        setIsChargePointConfigOpen((prev) => !prev);
    };

    // Handle change in number of charge points
    const handleChargePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newCount = parseInt(e.target.value, 10);
        if (isNaN(newCount) || newCount < 1 || newCount > MAX_CHARGE_POINTS) {
            setErrors((prev) => ({
                ...prev,
                chargePoints: `Number of charge points must be between 1 and ${MAX_CHARGE_POINTS}`,
            }));
            return;
        }
        setErrors((prev) => ({ ...prev, chargePoints: "" }));
        setChargePoints(newCount);

        // Adjust the configurations for each charge point
        if (newCount > chargePointConfigs.length) {
            setChargePointConfigs((prev) => [
                ...prev,
                ...Array(newCount - prev.length).fill({ power: defaultPower }),
            ]);
        } else if (newCount < chargePointConfigs.length) {
            setChargePointConfigs((prev) => prev.slice(0, newCount));
        }
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Final validation for all inputs
        if (chargePoints < 1 || chargePoints > MAX_CHARGE_POINTS) {
            setErrors((prev) => ({
                ...prev,
                chargePoints: `Number of charge points must be between 1 and ${MAX_CHARGE_POINTS}`,
            }));
            return;
        }
        if (arrivalProbability < 20 || arrivalProbability > 200) {
            setErrors((prev) => ({
                ...prev,
                arrivalProbability: "Arrival probability must be between 20% and 200%",
            }));
            return;
        }
        if (carConsumption < 1) {
            setErrors((prev) => ({ ...prev, carConsumption: "Car consumption must be at least 1 kWh" }));
            return;
        }

        // Submit the form
        onSubmit({
            chargePoints,
            chargePointConfigs,
            arrivalProbability,
            carConsumption,
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 p-8 bg-white shadow-md rounded-lg max-w-4xl mx-auto"
        >
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                EV Charging Simulation
            </h1>

            {/* General Settings Section */}
            <fieldset className="border rounded-lg p-4">
                <legend className="text-lg font-semibold text-gray-800">General Settings</legend>
                <div className="flex items-center justify-between mt-4">
                    <label className="flex-1 text-sm font-medium text-gray-700">
                        Number of Charge Points:
                    </label>
                    <input
                        type="number"
                        min="1"
                        max={MAX_CHARGE_POINTS}
                        value={chargePoints}
                        onChange={handleChargePointsChange}
                        className="w-24 border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary px-3 py-2"
                    />
                </div>
                {errors.chargePoints && <p className="text-sm text-red-500">{errors.chargePoints}</p>}
                <div className="flex items-center justify-between mt-4">
                    <label className="flex-1 text-sm font-medium text-gray-700">
                        Default Power per Charge Point (kW):
                    </label>
                    <input
                        type="number"
                        min="1"
                        value={defaultPower}
                        onChange={(e) =>
                            setDefaultPower(parseFloat(e.target.value))
                        }
                        className="w-24 border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary px-3 py-2"
                    />
                </div>
            </fieldset>

            {/* Charge Point Configuration Section */}
            <fieldset className="border rounded-lg p-4">
                <legend className="flex justify-between items-center text-lg font-semibold text-gray-800">
                    Charge Point Configuration
                    <button
                        type="button"
                        onClick={toggleChargePointConfig}
                        className="text-primary font-medium hover:underline focus:outline-none"
                    >
                        {isChargePointConfigOpen ? "Hide" : "Show"}
                    </button>
                </legend>
                {isChargePointConfigOpen && (
                    <>
                        <p className="text-sm text-gray-600 mb-4">
                            Configure the power for each charge point. Values are in kilowatts (kW).
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {chargePointConfigs.map((config, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <label className="flex-1 text-sm font-medium text-gray-700">
                                        Charge Point {index + 1}:
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={config.power}
                                        onChange={(e) => {
                                            const newPower = parseFloat(e.target.value);
                                            if (newPower < 1) {
                                                setErrors((prev) => ({
                                                    ...prev,
                                                    [`chargePoint_${index}`]: "Power must be at least 1 kW",
                                                }));
                                                return;
                                            }
                                            setErrors((prev) => ({ ...prev, [`chargePoint_${index}`]: "" }));
                                            const updatedConfigs = [...chargePointConfigs];
                                            updatedConfigs[index].power = newPower;
                                            setChargePointConfigs(updatedConfigs);
                                        }}
                                        className="w-24 border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary px-3 py-2"
                                    />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </fieldset>

            {/* Simulation Parameters Section */}
            <fieldset className="border rounded-lg p-4">
                <legend className="text-lg font-semibold text-gray-800">Simulation Parameters</legend>
                <div className="flex items-center justify-between mt-4">
                    <label className="flex-1 text-sm font-medium text-gray-700">
                        Arrival Probability Multiplier (%):
                    </label>
                    <input
                        type="number"
                        min="20"
                        max="200"
                        value={arrivalProbability}
                        onChange={(e) => setArrivalProbability(parseFloat(e.target.value))}
                        className="w-24 border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary px-3 py-2"
                    />
                </div>
                <div className="flex items-center justify-between mt-4">
                    <label className="flex-1 text-sm font-medium text-gray-700">
                        Car Consumption (kWh):
                    </label>
                    <input
                        type="number"
                        min="1"
                        value={carConsumption}
                        onChange={(e) => setCarConsumption(parseFloat(e.target.value))}
                        className="w-24 border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary px-3 py-2"
                    />
                </div>
            </fieldset>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-primary text-white py-3 px-6 rounded-lg shadow-md hover:bg-accent transition duration-200"
            >
                Simulate
            </button>
        </form>
    );
};

export default Form;
