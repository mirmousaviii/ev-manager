import React, { useState } from "react";
import { SimulationInputs } from "@/types";

type InputFormProps = {
    onSubmit: (inputs: SimulationInputs) => void;
};

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
    const [inputs, setInputs] = useState<SimulationInputs>({
        chargePoints: 20,
        arrivalProbability: 100,
        carConsumption: 18,
        chargingPower: 11,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs((prev) => ({
            ...prev,
            [name]: parseFloat(value),
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(inputs);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-100 rounded shadow">
            <div>
                <label htmlFor="chargePoints" className="block font-medium text-gray-700">
                    Charge Points:
                </label>
                <input
                    type="number"
                    id="chargePoints"
                    name="chargePoints"
                    value={inputs.chargePoints}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                />
            </div>
            <div>
                <label htmlFor="arrivalProbability" className="block font-medium text-gray-700">
                    Arrival Probability (%):
                </label>
                <input
                    type="number"
                    id="arrivalProbability"
                    name="arrivalProbability"
                    value={inputs.arrivalProbability}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                />
            </div>
            <div>
                <label htmlFor="carConsumption" className="block font-medium text-gray-700">
                    Car Consumption (kWh):
                </label>
                <input
                    type="number"
                    id="carConsumption"
                    name="carConsumption"
                    value={inputs.carConsumption}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                />
            </div>
            <div>
                <label htmlFor="chargingPower" className="block font-medium text-gray-700">
                    Charging Power (kW):
                </label>
                <input
                    type="number"
                    id="chargingPower"
                    name="chargingPower"
                    value={inputs.chargingPower}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                Simulate
            </button>
        </form>
    );
};

export default InputForm;
