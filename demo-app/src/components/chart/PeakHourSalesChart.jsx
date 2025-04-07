import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

const PeakHoursAndSalesChart = ({data}) => {
   
    if (!data) {
        return <div>No Peak Hour Data Available</div>;
    }

    // Preprocess the data to extract hours and minutes from peakHourStart
    const stations = [...new Set(data.map((item) => item.stationID))]; // Get unique station IDs
    const processedData = stations.map((stationID) => {
        const stationData = data.filter((item) => item.stationID === stationID);
        return {
            station: `Station ${stationID}`,
            data: stationData.map((item) => ({
                // hour: new Date(`${item.saleDateTime}`).getHours() +
                //       new Date(`${item.saleDateTime}`).getMinutes() / 60,
                hour: item.saleHour, // Assuming Sale Hour is in hours
                sales: item.totalSales,
            })),
        };
    });

    // Prepare data for Chart.js
    const chartData = {
        labels: Array.from({ length: 25 }, (_, i) => i), // X-axis labels (0-24 hours)
        datasets: processedData.map((station, index) => ({
            label: station.station,
            data: station.data.map((item) => ({
                x: item.hour,
                y: item.sales,
            })),
            borderColor: `hsl(${(index * 360) / stations.length}, 70%, 50%)`, // Unique color for each station
            backgroundColor: `hsl(${(index * 360) / stations.length}, 70%, 70%)`,
            tension: 0.4, // Smooth curve
            fill: false,
        })),
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: (context) => `Sales: ${context.raw.y}`,
                },
            },
        },
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: {
                    display: true,
                    text: 'Sales time in Hours (0-24)',
                },
                min: 0,
                max: 24,
            },
            y: {
                title: {
                    display: true,
                    text: 'Sales',
                },
            },
        },
    };

    return (
        <div style={{ width: '100%' }}>
            <Line data={chartData} options={chartOptions} />
        </div>
    );
};

export default PeakHoursAndSalesChart;