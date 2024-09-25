import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../create-edit.css';

const CreateVaccination = () => {
  const [formData, setFormData] = useState({
    vaccination_id: '',
    livestock_id: '',
    vaccine_name: '',
    vaccine_date: '',
    next_vaccination_date: '', // New field
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
      await axios.post('http://localhost:8081/api/vaccinations', formData);
      setSuccessMessage('Vaccination data added successfully!');
      // Clear the form data after successful submission if needed
      setFormData({
        vaccination_id: '',
        livestock_id: '',
        vaccine_name: '',
        vaccine_date: '',
        next_vaccination_date: '', // Clear the new field
      });
    } catch (error) {
      console.error('Error adding Vaccination data:', error);
    }
  };

  return (
    <div className="write-container">
      <h1 className="centered-heading">Add New Vaccination</h1>
      <form onSubmit={handleSubmit} className="create-form">
        <div className="write-col-md-12">
          <label className="write-form-group">
            Vaccination ID:
            <input
              type="text"
              name="vaccination_id"
              value={formData.vaccination_id}
              onChange={handleChange}
              className="write-form-control"
            />
          </label>
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
            Vaccine Name:
            <input
              type="text"
              name="vaccine_name"
              value={formData.vaccine_name}
              onChange={handleChange}
              className="write-form-control"
            />
          </label>
          <label className="write-form-group">
            Vaccine Date:
            <input
              type="date"
              name="vaccine_date"
              value={formData.vaccine_date}
              onChange={handleChange}
              className="write-form-control"
            />
          </label>
          <label className="write-form-group">
            Next Vaccination Date: {/* New field */}
            <input
              type="date"
              name="next_vaccination_date"
              value={formData.next_vaccination_date}
              onChange={handleChange}
              className="write-form-control"
            />
          </label>
          <button className="btn write-btn-primary" type="submit">
            Add Vaccination
          </button>
        </div>
      </form>
      {successMessage && <p className="write-alert write-alert-success">{successMessage}</p>}
    </div>
  );
};

export default CreateVaccination;
