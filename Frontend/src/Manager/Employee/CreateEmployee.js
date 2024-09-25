import React, { useState } from 'react';
import axios from 'axios';
import '../create-edit.css';

const CreateEmployee = () => {
  const [formData, setFormData] = useState({
    employee_id: '',
    name: '',
    task: '',
    phone: '',
    salary: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8081/api/employees', formData);
      setSuccessMessage('Employee data added successfully!');
      // Optionally, you can fetch the updated data to refresh the list
    } catch (error) {
      console.error('Error adding Employee data:', error);
      setSuccessMessage(
        `Error adding Employee data. Please try again. ${error.message}`
      );
    }
  };

  return (
    <div className="write-container">
      <form onSubmit={handleSubmit}>
        <div className="write-col-md-12">
          <h3 className="centered-heading">Add Employee Data</h3>
          <label className="write-form-group">
            Employee ID:
            <input
              type="text"
              name="employee_id"
              value={formData.employee_id}
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
            Add Employee
          </button>
        </div>
      </form>
      {successMessage && (
        <p className="write-alert write-alert-success">{successMessage}</p>
      )}
    </div>
  );
};

export default CreateEmployee;
