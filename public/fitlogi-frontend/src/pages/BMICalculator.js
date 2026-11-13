// src/pages/BMICalculator.js
import React, { useState } from "react";
import "./BMICalculator.css";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend);

function BMICalculator() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState("");
  const [statusColor, setStatusColor] = useState("");
  const [heightInMeters, setHeightInMeters] = useState(null);

  const calculateBMI = () => {
    if (!height || !weight || age < 2 || age > 120) return;

    const heightM = height / 100;
    setHeightInMeters(heightM);

    const bmiValue = (weight / (heightM * heightM)).toFixed(1);
    setBmi(bmiValue);

    let category = "";
    let color = "";

    if (bmiValue < 18.5) {
      category = "Underweight";
      color = "blue";
    } else if (bmiValue < 25) {
      category = "Normal";
      color = "green";
    } else if (bmiValue < 30) {
      category = "Overweight";
      color = "orange";
    } else {
      category = "Obese";
      color = "red";
    }

    setBmiCategory(category);
    setStatusColor(color);
  };

  const reset = () => {
    setAge("");
    setGender("male");
    setHeight("");
    setWeight("");
    setBmi(null);
    setBmiCategory("");
    setStatusColor("");
    setHeightInMeters(null);
  };

  const chartData = {
    labels: ["Underweight", "Normal", "Overweight", "Obese"],
    datasets: [
      {
        data: [
          bmi < 18.5 ? 1 : 0,
          bmi >= 18.5 && bmi < 25 ? 1 : 0,
          bmi >= 25 && bmi < 30 ? 1 : 0,
          bmi >= 30 ? 1 : 0,
        ],
        backgroundColor: ["#6495ED", "#32CD32", "#FFD700", "#FF6347"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bmi-container">
      <h2>BMI Calculator</h2>

      <div className="tabs">
        <button className="tab active">Metric Units</button>
      </div>

      {/* Flex wrapper for form and result side by side */}
      <div className="bmi-flex">
        {/* Left side: Form */}
        <div className="form">
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="2 - 120"
          />

          <label>Gender:</label>
          <div className="gender">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={() => setGender("male")}
              />{" "}
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={() => setGender("female")}
              />{" "}
              Female
            </label>
          </div>

          <label>Height (cm):</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />

          <label>Weight (kg):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />

          <div className="buttons">
            <button onClick={calculateBMI}>Calculate</button>
            <button onClick={reset} className="clear">
              Clear
            </button>
          </div>
        </div>

        {/* Right side: Result */}
        {bmi && heightInMeters && (
          <div className="result-section">
            <h3 className="result-heading">Result</h3>
            <p className="bmi-value">
              BMI = <strong>{bmi}</strong> kg/m²{" "}
              <span className={`bmi-category ${statusColor}`}>
                ({bmiCategory})
              </span>
            </p>

            <div className="pie-chart">
              <Pie data={chartData} />
            </div>

            <ul className="bmi-info">
              <li>Healthy BMI range: 18.5 – 24.9 kg/m²</li>
              <li>
                Healthy weight for height:{" "}
                {(18.5 * heightInMeters * heightInMeters).toFixed(1)}kg -{" "}
                {(24.9 * heightInMeters * heightInMeters).toFixed(1)}kg
              </li>
              <li>
                Ponderal Index: {(bmi / heightInMeters).toFixed(1)} kg/m³
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default BMICalculator;
