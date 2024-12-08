import React, { useState } from "react";
import { SimulationInput } from "@/types";

interface InputFormProps {
    onSubmit: (data: SimulationInput) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState<SimulationInput>({
        chargePoints: 20,
        arrivalProbability: 100,
        carConsumption: 18,
        chargingPower: 11,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: Number(e.target.value) });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow-md">
            <div>
                <label htmlFor="chargePoints" className="block font-medium text-gray-700">
                    Charge Points:
                </label>
                <input
                    type="number"
                    name="chargePoints"
                    id="chargePoints"
                    value={formData.chargePoints}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div>
                <label htmlFor="arrivalProbability" className="block font-medium text-gray-700">
                    Arrival Probability (%):
                </label>
                <input
                    type="number"
                    name="arrivalProbability"
                    id="arrivalProbability"
                    value={formData.arrivalProbability}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div>
                <label htmlFor="carConsumption" className="block font-medium text-gray-700">
                    Car Consumption (kWh):
                </label>
                <input
                    type="number"
                    name="carConsumption"
                    id="carConsumption"
                    value={formData.carConsumption}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div>
                <label htmlFor="chargingPower" className="block font-medium text-gray-700">
                    Charging Power (kW):
                </label>
                <input
                    type="number"
                    name="chargingPower"
                    id="chargingPower"
                    value={formData.chargingPower}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 focus:outline-none"
            >
                Simulate
            </button>
        </form>
    );
};

export default InputForm;
