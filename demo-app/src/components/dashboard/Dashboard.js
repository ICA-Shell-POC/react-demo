// src/Dashboard.js
import React, { useEffect, useState } from 'react';
import { fetchData } from '../../api/api';
import BarChart from '../chart/BarChart';
import PeakHoursAndSalesChart from '../chart/PeakHourSalesChart';
import './Dashboard.css'; 
const Dashboard = () => {

    const [data, setData] = useState();
    const [fuelData, setFuelData] = useState();

    useEffect(() => {
        const getData = async () => {
            const result = await fetchData('salestrends');
            setData(result);
        };
        const getFuelData = async () => {
            const result = await fetchData('fuelsales');
            setFuelData(result);
        }
        getData();
        getFuelData();
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dashboard-container">
            <div className="chart-grid">
                <div className='chart-section'>
                    <h2 style={{ color: 'black' }}>Sales Data</h2>
                    <BarChart data={data} />
                </div>
                <div className='chart-section'>
                    <h2 style={{ color: 'black' }}>Sales trend per station</h2>
                    <PeakHoursAndSalesChart data={fuelData}/>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;