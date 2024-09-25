import React, { useState } from 'react';
import axios from 'axios';
import '../create-edit.css';

const CreateDailyMilk = () => {
  const [formData, setFormData] = useState({
    date: '',
    price: '',
    quantity: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8081/api/dailymilk', formData);
      setSuccessMessage('Daily Milk record added successfully!');
      // Optionally, you can fetch the updated data to refresh the list
    } catch (error) {
      console.error('Error adding Daily Milk record:', error);
      setSuccessMessage(
        `Error adding Daily Milk record. Please try again. ${error.message}`
      );
    }
  };

  return (
    <div className="write-container">
      <form onSubmit={handleSubmit}>
        <div className="write-col-md-12">
          <h3 className="centered-heading">Add Daily Milk Record</h3>
          <label className="write-form-group">
            Date:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="write-form-control"
              required
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
              required
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
              required
            />
          </label>

          <button className="btn write-btn-primary" type="submit">
            Add Daily Milk Record
          </button>
        </div>
      </form>
      {successMessage && (
        <p className="write-alert write-alert-success">{successMessage}</p>
      )}
    </div>
  );
};

export default CreateDailyMilk;
