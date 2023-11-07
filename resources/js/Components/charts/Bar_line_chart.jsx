import React, { FC, useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const labels = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
// const scores = [2, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const options = {
  fill: true,
  animations: {
    _config: {
      duration: 0, // Desactivar las animaciones
    },
  },
  scales: {
    y: {
      min: 0,
      max: 30
    },
  },
  responsive: true,
  plugins: {
    customCanvasBackgroundColor: {
      color: 'rgba(0, 0, 0, 1)',
    },
    legend: {
      display: true,
    },
    customLine: {
      lineValue: 10,
      borderColor: "rgba(0, 0, 0, 1)",
      borderWidth: 2,
      borderDash: [5, 5],
    },
  },
};

const BarChart = ({scores}) => {
  const data = useMemo(function () {
    return {
      datasets: [
        {
          label: "Horas Perdidas",
          tension: 0.3,
          data: scores,
          borderColor: "rgb(56, 84, 73)",
          backgroundColor: "rgba(255, 192, 0)",
          borderWidth: 2
        },
      ],
      labels,
    };
  }, []);

  return (
    <div className="App w-full h-full flex justify-center items-center">
      <Bar data={data} options={options} />
    </div>
  );
}

export default BarChart;