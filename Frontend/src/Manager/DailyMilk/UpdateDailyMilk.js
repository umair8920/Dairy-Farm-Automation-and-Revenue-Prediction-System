import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../create-edit.css';

const UpdateDailyMilk = () => {
  const { milk_id } = useParams();
  const [dailyMilk, setDailyMilk] = useState({});
  const [formData, setFormData] = useState({
    date: '',
    price: '',
    quantity: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch daily milk data when component mounts
    fetchDailyMilkData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchDailyMilkData = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/dailymilk/${milk_id}`);
      setDailyMilk(response.data);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching daily milk data:', error);
      setErrorMessage('Error fetching daily milk data. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8081/api/dailymilk/${milk_id}`, formData);
      setSuccessMessage('Daily milk data updated successfully!');
    } catch (error) {
      console.error('Error updating daily milk data:', error);
      setErrorMessage('');
    }
  };

  return (
    <div className="write-container">
      <form onSubmit={handleSubmit} className="update-form">
        <div className="write-col-md-12">
          <h3 className="centered-heading">Update Daily Milk Record</h3>
          <label className="write-form-group">
            Date:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="write-form-control"
            />
          </label>
          <label className="write-form-group">
            Price:
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="write-form-control"
            />
          </label>
          <label className="write-form-group">
            Quantity:
            <input
              type="text"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="write-form-control"
            />
          </label>
          <button className="btn write-btn-primary" type="submit">
            Update Daily Milk
          </button>
        </div>
      </form>
      {successMessage && (
        <p className="write-alert write-alert-success">{successMessage}</p>
      )}
    </div>
  );
};

export default UpdateDailyMilk;
