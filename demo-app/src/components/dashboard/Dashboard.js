// src/Dashboard.js
import React, { useEffect, useState } from 'react';
import { fetchData } from '../../api/api';
import BarChart from '../chart/BarChart';
import PeakHoursAndSalesChart from '../chart/PeakHourSalesChart';

const Dashboard = () => {

    const [data, setData] = useState();

    useEffect(() => {
        const getData = async () => {
            const result = await fetchData();
            setData(result);
        };
        getData();
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dashboard-container">
            <div className="chart-grid">
                <div>
                    <h2 style={{ color: 'black' }}>Sales Data</h2>
                    <BarChart data={data} />
                </div>
                <div>
                    <h2 style={{ color: 'black' }}>Peak Hour Data</h2>
                    {/* <PeakHoursAndSalesChart /> */}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;