import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../read.css'; // Import the provided CSS file
import ManagerPanel from '../ManagerPanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSearch } from '@fortawesome/free-solid-svg-icons';
import '../read.css';
const ReadEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching Employees data:', error);
    }
  };

  const handleDelete = async (employee_id) => {
    console.log("Deleting employee with ID:", employee_id);
  
    try {
      await axios.delete(`http://localhost:8081/api/employees/${employee_id}`);
      // If the delete request is successful, fetch the updated data to refresh the list
      fetchData();
    } catch (error) {
      console.error(`Error deleting employee with ID ${employee_id}:`, error);
    }
  };

  const searchEmployees = () => {
    if (!searchQuery) {
      fetchData(); // If search query is empty, fetch all employees
      return;
    }
    // Filter employees by employee_id or name
    const filteredEmployees = employees.filter(employee => 
      employee.employee_id.toString().includes(searchQuery) || 
      employee.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setEmployees(filteredEmployees);
  };

  return (
    <div>
      <ManagerPanel />
      <div className="container"> {/* Add container class */}
        <h1 className="centered-heading">Employee Data</h1>
        <div className="search-container"> {/* Add search-container class */}
          <input
            type="text"
            placeholder="Search by Employee ID or Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {/* Replace text with search icon */}
          <button onClick={searchEmployees}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <table> {/* Add table class */}
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Task</th>
              <th>Phone</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.employee_id}>
                <td>{employee.employee_id}</td>
                <td>{employee.name}</td>
                <td>{employee.task}</td>
                <td>{employee.phone}</td>
                <td>{employee.salary}</td>
                <td>
                  <Link to={`/UpdateEmployee/${employee.employee_id}`}>
                    <FontAwesomeIcon icon={faEdit} style={{ marginRight: '10px' }} />
                  </Link>
                  <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(employee.employee_id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReadEmployee;
