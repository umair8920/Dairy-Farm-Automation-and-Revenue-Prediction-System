import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import './livestock.css'; // Import the provided CSS file
import VeterinarianPanel from '../VeterinarianPanel';

const ReadVaccination = () => {
  const [vaccinations, setVaccinations] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/vaccinations');
      setVaccinations(response.data);
    } catch (error) {
      console.error('Error fetching Vaccination data:', error);
    }
  };

  const handleDelete = async (vaccination_id) => {
    try {
      await axios.delete(`http://localhost:8081/api/vaccinations/${vaccination_id}`);
      fetchData(); // Refresh the data after deletion
    } catch (error) {
      console.error('Error deleting Vaccination data:', error);
    }
  };

  return (
    <div>  <VeterinarianPanel />
    <div className="container"> {/* Add container class */}
      
      <h1 className="centered-heading">Vaccination Records</h1>
      <table> {/* Add table class */}
        <thead>
          <tr>
            <th>Vaccination ID</th>
            <th>Livestock ID</th>
            <th>Vaccine Name</th>
            <th>Vaccine Date</th>
            <th>Next Vaccination Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vaccinations.map((vaccination) => (
            <tr key={vaccination.vaccination_id}>
              <td>{vaccination.vaccination_id}</td>
              <td>{vaccination.livestock_id}</td>
              <td>{vaccination.vaccine_name}</td>
              <td>{vaccination.vaccine_date}</td>
              <td>{vaccination.next_vaccination_date}</td>
              <td>
                <Link to={`/UpdateVaccination/${vaccination.vaccination_id}`}>
                  <FontAwesomeIcon icon={faEdit} style={{ marginRight: '10px' }} />
                </Link>
                <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(vaccination.vaccination_id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default ReadVaccination;
