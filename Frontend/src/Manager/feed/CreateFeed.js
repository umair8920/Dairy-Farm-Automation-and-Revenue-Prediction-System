import React, { useState } from 'react';
import axios from 'axios';
import '../create-edit.css';

const CreateFeed = () => {
  const [formData, setFormData] = useState({
    feed_id: '',
    name: '',
    type: '',
    quantity: '',
    cost: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8081/api/feeds', formData);
      setSuccessMessage('Feed data added successfully!');
      // Optionally, you can reset the form fields here
    } catch (error) {
      console.error('Error adding Feed data:', error);
      setSuccessMessage(
        `Error adding Feed data. Please try again. ${error.message}`
      );
    }
  };

  return (
    <div className="write-container">
      <form onSubmit={handleSubmit} className="create-form">
        <div className="write-col-md-12">
          <h3 className="centered-heading">Add Feed Data</h3>
          <label className="write-form-group">
            Feed ID:
            <input
              type="text"
              name="feed_id"
              value={formData.feed_id}
              onChange={handleChange}
              className="write-form-control"
            />
          </label>
          <label className="write-form-group">
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="write-form-control"
            />
          </label>
          <label className="write-form-group">
            Type:
            <input
              type="text"
              name="type"
              value={formData.type}
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
          <label className="write-form-group">
            Cost:
            <input
              type="text"
              name="cost"
              value={formData.cost}
              onChange={handleChange}
              className="write-form-control"
            />
          </label>
          <button className="btn write-btn-primary" type="submit">
            Add Feed
          </button>
        </div>
      </form>
      {successMessage && (
        <p className="write-alert write-alert-success">{successMessage}</p>
      )}
    </div>
  );
};

export default CreateFeed;
