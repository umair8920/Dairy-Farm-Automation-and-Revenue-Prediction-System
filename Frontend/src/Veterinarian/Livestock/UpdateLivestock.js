import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../create-edit.css';
const UpdateLivestock = () => {
  const { livestock_id } = useParams();
  const [livestock, setLivestock] = useState({});
  const [formData, setFormData] = useState({
    age: '',
    color: '',
    breed: '',
    gender: '',
    healthstatus: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch livestock data when component mounts
    fetchLivestockData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchLivestockData = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/livestock/${livestock_id}`);
      setLivestock(response.data);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching livestock data:', error);
      setErrorMessage('Error fetching livestock data. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8081/api/livestock/${livestock_id}`, formData);
      setSuccessMessage('Livestock data updated successfully!');
    } catch (error) {
      console.error('Error updating livestock data:', error);
      setErrorMessage('');
    }
  };

  return (
    <div className="write-container">
     
     
      <form onSubmit={handleSubmit} className="update-form">
        <div className="write-col-md-12">
        <h3 className="centered-heading">Update Livestock Data</h3>
          <label className="write-form-group">
            Age:
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="write-form-control"
            />
          </label>
          <label className="write-form-group">
            Color:
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="write-form-control"
            />
          </label>
          <label className="write-form-group">
            Breed:
            <input
              type="text"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              className="write-form-control"
            />
          </label>
          <label className="write-form-group">
            Gender:
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="write-form-control"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </label>
          <label className="write-form-group">
            Health Status:
            <input
              type="text"
              name="healthstatus"
              value={formData.healthstatus}
              onChange={handleChange}
              className="write-form-control"
            />
          </label>
          <button className="btn write-btn-primary" type="submit">
            Update Livestock
          </button>
        </div>
      </form>
      {successMessage && (
        <p className="write-alert write-alert-success">{successMessage}</p>
      )}
    </div>
  );
};

export default UpdateLivestock;
