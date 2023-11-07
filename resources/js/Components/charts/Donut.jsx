import { ArcElement, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import {
    Chart as ChartJS
  } from "chart.js";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)

const DonuChart = () => {
    const data = {
        labels: ['Categoria A', 'Categoria B', 'Categoria C'],
        datasets: [
            {
            label: 'Fallas Registradas',
            data: [300, 50, 100],
            backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
            },
        ],
    };
    const options = {}
    return (
        <div className="App w-full h-[90%] flex justify-center items-center">
            <Doughnut data={data} options={options} />
        </div>
    );
}

export default DonuChart;