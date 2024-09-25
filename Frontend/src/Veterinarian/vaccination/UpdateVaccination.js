import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../create-edit.css';

const UpdateVaccination = () => {
  const { vaccination_id } = useParams();
  const [formData, setFormData] = useState({
    livestock_id: '',
    vaccine_name: '',
    vaccine_date: '',
    next_vaccination_date: '', // New field
  });
  const [livestocks, setLivestocks] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchLivestocks();
    fetchVaccinationData();
  }, []);

  const fetchLivestocks = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/livestock');
      setLivestocks(response.data);
    } catch (error) {
      console.error('Error fetching Livestocks data:', error);
    }
  };

  const fetchVaccinationData = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/vaccinations/${vaccination_id}`);
      setFormData({
        livestock_id: response.data.livestock_id,
        vaccine_name: response.data.vaccine_name,
        vaccine_date: response.data.vaccine_date,
        next_vaccination_date: response.data.next_vaccination_date, // Set next_vaccination_date from fetched data
      });
    } catch (error) {
      console.error('Error fetching Vaccination data:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8081/api/vaccinations/${vaccination_id}`, formData);
      setSuccessMessage('Vaccination data updated successfully!');
    } catch (error) {
      console.error('Error updating Vaccination data:', error);
      setErrorMessage('Error updating Vaccination data. Please try again.');
    }
  };

  return (
    <div className="write-container">
      <h1 className="centered-heading">Update Vaccination Data</h1>
      <form onSubmit={handleSubmit} className="create-form">
        <div className="write-col-md-12">
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
            Next Vaccination Date:
            <input
              type="date"
              name="next_vaccination_date"
              value={formData.next_vaccination_date}
              onChange={handleChange}
              className="write-form-control"
            />
          </label>
          <button className="btn write-btn-primary" type="submit">
            Update Vaccination
          </button>
        </div>
      </form>
      {successMessage && <p className="write-alert write-alert-success">{successMessage}</p>}
      {errorMessage && <p className="write-alert write-alert-error">{errorMessage}</p>}
    </div>
  );
};

export default UpdateVaccination;
