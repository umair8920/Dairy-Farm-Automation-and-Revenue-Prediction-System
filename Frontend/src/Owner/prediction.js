import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Prediction.css'; // Import the CSS file
import OwnerPanel from './OwnerPanel';

function Prediction() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/results')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                setError(error.message);
            });
    }, []);

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    if (!data) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div>
            <OwnerPanel/>
        <div className="prediction-container">
            <div className="title-container">
                <h2 className="title"> Prediction Results</h2>
            </div>
            <div className="result-container">
                <span className="label">Current Revenue:</span>
                <span className="value">{data.current_revenue}</span>
            </div>
            <div className="result-container">
                <span className="label">Current Cost:</span>
                <span className="value">{data.current_cost}</span>
            </div>
            <div className="result-container">
                <span className="label">Current Profit:</span>
                <span className="value">{data.current_profit}</span>
            </div>
            <div className="result-container">
                <span className="label">Estimated Revenue for Next Two Weeks:</span>
                <span className="value">{data.estimated_revenue_next_two_weeks}</span>
            </div>
            <div className="result-container">
                <span className="label">Estimated Cost for Next Two Weeks:</span>
                <span className="value">{data.estimated_cost_next_two_weeks}</span>
            </div>
            <div className="result-container">
                <span className="label">Estimated Profit for Next Two Weeks:</span>
                <span className="value">{data.estimated_profit_next_two_weeks}</span>
            </div>
        </div>
        </div>
    );
}

export default Prediction;
