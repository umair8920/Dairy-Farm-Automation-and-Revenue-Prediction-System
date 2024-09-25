import React, { useState } from 'react';
import axios from 'axios';
import './create-edit.css';

const CreateSuggestions = () => {
  const [formData, setFormData] = useState({
    suggestion: '',
    temperature: '',
    activity: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8081/api/suggestions', formData);
      setSuccessMessage('Suggestion added successfully!');
      // Optionally, you can fetch the updated data to refresh the list
    } catch (error) {
      console.error('Error adding suggestion:', error);
      setSuccessMessage(
        `Error adding suggestion. Please try again. ${error.message}`
      );
    }
  };

  return (
    <div className="write-container">
      <form onSubmit={handleSubmit}>
        <div className="write-col-md-12">
          <h3 className="centered-heading">Add Suggestion</h3>
          <label className="write-form-group">
            Suggestion:
            <input
              type="text"
              name="suggestion"
              value={formData.suggestion}
              onChange={handleChange}
              className="write-form-control"
              required
            />
          </label>
          <label className="write-form-group">
            Temperature:
            <input
              type="text"
              name="temperature"
              value={formData.temperature}
              onChange={handleChange}
              className="write-form-control"
              required
            />
          </label>
          <label className="write-form-group">
            Activity:
            <input
              type="text"
              name="activity"
              value={formData.activity}
              onChange={handleChange}
              className="write-form-control"
              required
            />
          </label>

          <button className="btn write-btn-primary" type="submit">
            Add Suggestion
          </button>
        </div>
      </form>
      {successMessage && (
        <p className="write-alert write-alert-success">{successMessage}</p>
      )}
    </div>
  );
};

export default CreateSuggestions;
