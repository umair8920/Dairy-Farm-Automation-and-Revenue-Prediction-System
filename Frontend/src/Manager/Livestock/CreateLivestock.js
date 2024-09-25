import React, { useState } from 'react';
import axios from 'axios';
import '../create-edit.css';

const LivestockWriteComponent = () => {
  const [formData, setFormData] = useState({
    livestock_id: '',
    age: '',
    color: '',
    breed: '',
    gender: '',
    healthstatus: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8081/api/Livestock', formData);
      setSuccessMessage('Livestock data added successfully!');
      // Optionally, you can fetch the updated data to refresh the list
    } catch (error) {
      console.error('Error adding Livestock data:', error);
      setSuccessMessage(
        `Error adding Livestock data. Please try again. ${error.message}`
      );
    }
  };

  return (
    <div className="write-container">
      <form onSubmit={handleSubmit}>
        <div className="write-col-md-12">
          <h3 className="centered-heading">Write Livestock Data</h3>
          <label className="write-form-group">
            ID:
            <input
              type="text"
              name="livestock_id"
              value={formData.livestock_id}
              onChange={handleChange}
              className="write-form-control"
            />
          </label>
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
            <select
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              className="write-form-control"
            >
              <option value="Nili-Ravi">Nili-Ravi</option>
              <option value="Kundhi">Kundhi</option>
              <option value="Azi-Khaeli">Azi-Khaeli</option>
            </select>
          </label>
          <label className="write-form-group">
            Gender:
            <div>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={handleChange}
                  className="write-form-control"
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={handleChange}
                  className="write-form-control"
                />
                Female
              </label>
            </div>
          </label>
          <label className="write-form-group">
            Health Status:
            <select
              name="healthstatus"
              value={formData.healthstatus}
              onChange={handleChange}
              className="write-form-control"
            >
              <option value="healthy">Healthy</option>
              <option value="weak">Weak</option>
              <option value="sick">Sick</option>
            </select>
          </label>
          <button className="btn write-btn-primary" type="submit">
            Add Livestock
          </button>
        </div>
      </form>
      {successMessage && (
        <p className="write-alert write-alert-success">{successMessage}</p>
      )}
    </div>
  );
};

export default LivestockWriteComponent;
