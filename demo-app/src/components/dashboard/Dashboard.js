// src/Dashboard.js
import React, { useEffect, useState } from 'react';
import { fetchData } from '../../api/api';
import BarChart from '../chart/BarChart';
import PeakHoursAndSalesChart from '../chart/PeakHourSalesChart';
import './Dashboard.css'; 
const Dashboard = () => {

    const [data, setData] = useState();
    const [fuelData, setFuelData] = useState();
    const [refreshMessage, setRefreshMessage] = useState("");
    
    useEffect(() => {
        let isIntervalRunning = false;
        const getData = async () => {
            const result = await fetchData('salestrends');
            setData(result);
            const now = new Date();
            setRefreshMessage("Last refreshed at: "+ now.toLocaleString());
        };
        const getFuelData = async () => {
            const result = await fetchData('fuelsales');
            setFuelData(result);
        }
        if (!isIntervalRunning) {
        getData();
        getFuelData();
        }
        
        const intervalData = setInterval(() => {
            isIntervalRunning = true;
            getData();
        }, 1 * 60 * 1000);

        const intervalFuelData = setInterval(() => {
            isIntervalRunning = true;
            getFuelData();
        }, 1 * 60 * 1000);

        return () => {
            clearInterval(intervalData);
            clearInterval(intervalFuelData);
        };
            
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dashboard-container">
            <div className="chart-grid">
                <div className='chart-section'>
                    <h5 style={{ color: 'black' }} className='refresh-message'>{refreshMessage}</h5>
                    <h2 style={{ color: 'black' }}>Sales Data</h2>
                    <BarChart data={data} refreshed={refreshMessage}/>
                </div>
                <div className='chart-section'>
                    <h5 style={{ color: 'black' }} className='refresh-message'>{refreshMessage}</h5>
                    <h2 style={{ color: 'black' }}>Sales trend per station</h2>
                    <PeakHoursAndSalesChart data={fuelData} refreshed={refreshMessage}/>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;