import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../create-edit.css';

const UpdateMilkProduction = () => {
  const { production_id } = useParams();
  const [formData, setFormData] = useState({
    livestock_id: '',
    production_date: '',
    milk_quantity: '',
    milk_cost: '',
  });
  const [livestocks, setLivestocks] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchLivestocks();
    fetchMilkProductionData();
  }, []);

  const fetchLivestocks = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/livestock');
      setLivestocks(response.data);
    } catch (error) {
      console.error('Error fetching Livestocks data:', error);
    }
  };

  const fetchMilkProductionData = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/milkproductions/${production_id}`);
      setFormData({
        livestock_id: response.data.livestock_id,
        production_date: response.data.production_date,
        milk_quantity: response.data.milk_quantity,
        milk_cost: response.data.milk_cost,
      });
    } catch (error) {
      console.error('Error fetching Milk Production data:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8081/api/milkproductions/${production_id}`, formData);
      setSuccessMessage('Milk Production data updated successfully!');
    } catch (error) {
      console.error('Error updating Milk Production data:', error);
      setErrorMessage('');
    }
  };

  return (
    <div className="write-container">
      
      <form onSubmit={handleSubmit} className="create-form">
        <div className="write-col-md-12">
        <h1 className="centered-heading">Update Milk Production Data</h1>
          <label className="write-form-group">
            Livestock ID:
            <select
              name="livestock_id"
              value={formData.livestock_id}
              onChange={handleChange}
              className="write-form-control"
            >
              <option value="">Select Livestock ID</option>
              {livestocks.map((livestock) => (
                <option key={livestock.livestock_id} value={livestock.livestock_id}>
                  {livestock.livestock_id}
                </option>
              ))}
            </select>
          </label>
          <label className="write-form-group">
            Production Date:
            <input
              type="date"
              name="production_date"
              value={formData.production_date}
              onChange={handleChange}
              className="write-form-control"
            />
          </label>
          <label className="write-form-group">
            Milk Quantity:
            <input
              type="text"
              name="milk_quantity"
              value={formData.milk_quantity}
              onChange={handleChange}
              className="write-form-control"
            />
          </label>
          <label className="write-form-group">
            Milk Cost:
            <input
              type="text"
              name="milk_cost"
              value={formData.milk_cost}
              onChange={handleChange}
              className="write-form-control"
            />
          </label>
          <button className="btn write-btn-primary" type="submit">
            Update Milk Production
          </button>
        </div>
      </form>
      {successMessage && <p className="write-alert write-alert-success">{successMessage}</p>}
      {errorMessage && <p className="write-alert write-alert-error">{errorMessage}</p>}
    </div>
  );
};

export default UpdateMilkProduction;
