import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const ProgressChart = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Weight (kg)",
        data: [65, 64.5, 64, 63.8, 63.5, 63, 62.8],
        borderColor: "#00b894",
        backgroundColor: "#00cec9",
        fill: false,
        tension: 0.4,
        pointBackgroundColor: "#0984e3",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#2d3436",
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: "Weekly Progress Graph",
        color: "#2d3436",
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#636e72" },
        grid: { display: false },
      },
      y: {
        ticks: { color: "#636e72" },
        grid: { borderDash: [4, 4] },
      },
    },
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: "30px",
        marginTop: "30px",
      }}
    >
      {/* Chart Container */}
      <div
        style={{
          flex: "1 1 60%",
          minWidth: "300px",
          height: "400px",
          backgroundColor: "#fdfdfd",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Line data={data} options={options} />
      </div>

      {/* Workout Frequency Block */}
      <div
        style={{
          flex: "1 1 35%",
          minWidth: "250px",
          backgroundColor: "#fff4e6",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3 style={{ marginBottom: "15px", color: "#d35400", fontSize: "18px" }}>
          🏋️‍♂️ Workout Frequency (Last 30 Days)
        </h3>
        <ul style={{ listStyle: "none", padding: "0", color: "#2d3436" }}>
          <li style={{ marginBottom: "10px" }}>🧘 Yoga - 10 days</li>
          <li style={{ marginBottom: "10px" }}>🏋️ Gym - 8 days</li>
          <li style={{ marginBottom: "10px" }}>🏃 Cardio - 5 days</li>
          <li>😴 Rest Days - 7 days</li>
        </ul>
      </div>
    </div>
  );
};

export default ProgressChart;
