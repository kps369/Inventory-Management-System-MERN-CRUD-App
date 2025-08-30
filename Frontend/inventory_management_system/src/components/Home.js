import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
    const { token } = useContext(AuthContext);
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await fetch(`http://localhost:3001/products/stats`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                const data = await res.json();

                if (res.status === 200) {
                    setStats(data);
                } else {
                    console.log("Something went wrong. Please try again.");
                }
            } catch (err) {
                console.log(err);
            }
        };

        if (token) {
            getStats();
        }
    }, [token]);

    const data = {
        labels: stats?.categoryBreakdown.map(c => c._id),
        datasets: [
            {
                label: '# of Products',
                data: stats?.categoryBreakdown.map(c => c.count),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    if (!stats) {
        return <div>Loading...</div>
    }

    return (
        <div className='container-fluid p-5'>
            <h1>Dashboard</h1>
            <div className="row mt-4">
                <div className="col-md-4">
                    <div className="card text-white bg-primary mb-3">
                        <div className="card-header">Total Items in Stock</div>
                        <div className="card-body">
                            <h5 className="card-title">{stats.totalItemsInStock}</h5>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-white bg-success mb-3">
                        <div className="card-header">Total Inventory Value</div>
                        <div className="card-body">
                            <h5 className="card-title">${stats.totalInventoryValue.toFixed(2)}</h5>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-white bg-danger mb-3">
                        <div className="card-header">Low Stock Items</div>
                        <div className="card-body">
                            <h5 className="card-title">{stats.lowStockItems}</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-6">
                    <h2>Product Categories</h2>
                    <Pie data={data} />
                </div>
            </div>
        </div>
    )
}
