import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => `Station ${item.stationID}`),
    datasets: [
      {
        label: 'Total Fuel Sold',
        data: data.map(item => item.totalFuelSold),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }
    ]
  };

  const options = {
    scales: {
      y: {
        type: 'linear',
        beginAtZero: true,
        ticks: {
            stepSize: 0.5,
            max: 24,
          },
      },
    },
    tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            const dataset = data.datasets[tooltipItem.datasetIndex];
            const totalFuelSold = dataset.data[tooltipItem.index];
            return `Total Fuel Sold: ${totalFuelSold}`;
          },
        },
      },
  };
  

  return <Bar data={chartData} options={options} />;
};

export default BarChart;