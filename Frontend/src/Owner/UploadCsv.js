import React, { useState } from 'react';
import axios from 'axios';
import OwnerPanel from './OwnerPanel';
import '@mdi/font/css/materialdesignicons.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UploadCSV.css'; // Import the CSS file

const UploadCSV = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Upload the file
      await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // Fetch the result
      const response = await axios.get('http://localhost:5000/result');
      setResult(response.data);
    } catch (error) {
      console.error('Error uploading file or fetching result:', error);
    }
  };

  return (
    <div>
      <OwnerPanel />
    
    <div className="upload-csv-container">
      
      <div className="upload-csv-content">
        <h1>Upload CSV File</h1>
        <div className="upload-section">
          <input type="file" onChange={handleFileChange} className="form-control-file" />
          <button onClick={handleUpload} className="btn btn-primary">Upload</button>
        </div>
        {result && (
          <div className="result-section">
            <h2>Results</h2>
            <p><strong>Current Revenue:</strong> {result.current_revenue}</p>
            <p><strong>Current Profit:</strong> {result.current_profit}</p>
            <p><strong>Predicted Revenue:</strong> {result.predicted_revenue}</p>
            <p><strong>Predicted Profit:</strong> {result.predicted_profit}</p>
            <p><strong>Total Revenue:</strong> {result.total_revenue}</p>
            <p><strong>Total Profit:</strong> {result.total_profit}</p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default UploadCSV;
