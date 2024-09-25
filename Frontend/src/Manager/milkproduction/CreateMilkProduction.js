import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../create-edit.css';

const CreateMilkProduction = () => {
  const [formData, setFormData] = useState({
    livestock_id: '',
    production_date: '',
    milk_quantity: '',
    milk_cost: '',
  });
  const [livestocks, setLivestocks] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchLivestocks();
  }, []);

  const fetchLivestocks = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/livestock');
      setLivestocks(response.data);
    } catch (error) {
      console.error('Error fetching Livestocks data:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8081/api/milkproductions', formData);
      setSuccessMessage('Milk production data added successfully!');
      // Clear the form data after successful submission if needed
      setFormData({
        livestock_id: '',
        production_date: '',
        milk_quantity: '',
        milk_cost: '',
      });
    } catch (error) {
      console.error('Error adding Milk production data:', error);
    }
  };

  return (
    <div className="write-container">
    
      <form onSubmit={handleSubmit} className="create-form">
        <div className="write-col-md-12">
        <h1 className="centered-heading">Add New Milk Production</h1>
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
            Add Milk Production
          </button>
        </div>
      </form>
      {successMessage && <p className="write-alert write-alert-success">{successMessage}</p>}
    </div>
  );
};

export default CreateMilkProduction;
