import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../create-edit.css';
const UpdateEmployee = () => {
  const { employee_id } = useParams();
  const [employee, setEmployee] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    task: '',
    phone: '',
    salary: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch employee data when component mounts
    fetchEmployeeData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/employees/${employee_id}`);
      setEmployee(response.data);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching employee data:', error);
      setErrorMessage('Error fetching employee data. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8081/api/employees/${employee_id}`, formData);
      setSuccessMessage('Employee data updated successfully!');
    } catch (error) {
      console.error('Error updating employee data:', error);
      setErrorMessage('');
    }
  };

  return (
    <div className="write-container">
     
      <form onSubmit={handleSubmit} className="update-form">
        <div className="write-col-md-12">
        <h3 className="centered-heading">Update Employee Data</h3>
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
            Task:
            <input
              type="text"
              name="task"
              value={formData.task}
              onChange={handleChange}
              className="write-form-control"
            />
          </label>
          <label className="write-form-group">
            Phone:
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="write-form-control"
            />
          </label>
          <label className="write-form-group">
            Salary:
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="write-form-control"
            />
          </label>
          <button className="btn write-btn-primary" type="submit">
            Update Employee
          </button>
        </div>
      </form>
      {successMessage && (
        <p className="write-alert write-alert-success">{successMessage}</p>
      )}
    </div>
  );
};

export default UpdateEmployee;
