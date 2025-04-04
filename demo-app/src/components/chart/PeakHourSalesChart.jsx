import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend);

const data = {
  labels: ['Station 1', 'Station 2'],
  datasets: [
    {
      type: 'bar',
      label: 'Total Fuel Sold',
      data: [3750, 1950],
      backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)'],
    },
    {
      type: 'line',
      label: 'Peak Hour Start',
      data: [7.5, 9], // Converted to hours
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      yAxisID: 'y-axis-2',
    },
    {
      type: 'line',
      label: 'Peak Hour End',
      data: [18.5, 19], // Converted to hours
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      yAxisID: 'y-axis-2',
    },
  ],
};

const options = {
  scales: {
    x: {
      title: {
        display: true,
        text: 'Stations',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Total Fuel Sold',
      },
    },
    'y-axis-2': {
      position: 'right',
      title: {
        display: true,
        text: 'Peak Hours (in hours)',
      },
      min: 0,
      max: 24,
    },
  },
};

const PeakHoursAndSalesChart = () => {
  return (
    <div>
      <h2>Peak Hours and Sales</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default PeakHoursAndSalesChart;