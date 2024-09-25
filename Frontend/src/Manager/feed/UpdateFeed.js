import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../create-edit.css';
const UpdateFeed = () => {
  const { feed_id } = useParams();
  const [feed, setFeed] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    quantity: '',
    cost: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch feed data when component mounts
    fetchFeedData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchFeedData = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/feeds/${feed_id}`);
      setFeed(response.data);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching feed data:', error);
      setErrorMessage('Error fetching feed data. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8081/api/feeds/${feed_id}`, formData);
      setSuccessMessage('Feed data updated successfully!');
    } catch (error) {
      console.error('Error updating feed data:', error);
      setErrorMessage('Error updating feed data. Please try again.');
    }
  };

  return (
    <div className="write-container">
      <h3 className="centered-heading">Update Feed Data</h3>
   
      <form onSubmit={handleSubmit} className="create-form">
        <div className="write-col-md-12">
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
            Update Feed
          </button>
        </div>
      </form>
      {successMessage && <p className="write-alert write-alert-success">{successMessage}</p>}
    </div>
  );
};

export default UpdateFeed;
