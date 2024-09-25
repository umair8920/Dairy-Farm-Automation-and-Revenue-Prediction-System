import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSearch } from '@fortawesome/free-solid-svg-icons';
import '../read.css'; // Import the provided CSS file
import ManagerPanel from '../ManagerPanel';

const ReadVaccination = () => {
  const [vaccinations, setVaccinations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  const searchVaccinations = () => {
    if (!searchQuery) {
      fetchData(); // If search query is empty, fetch all vaccinations
      return;
    }
    // Filter vaccinations by vaccination_id, livestock_id, or vaccine_name
    const filteredVaccinations = vaccinations.filter(vaccination => 
      vaccination.vaccination_id.toString().includes(searchQuery) || 
      vaccination.livestock_id.toString().includes(searchQuery) ||
      vaccination.vaccine_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setVaccinations(filteredVaccinations);
  };

  return (
    <div>
      <ManagerPanel />
      <div className="container"> {/* Add container class */}
        <h1 className="centered-heading">Vaccination Records</h1>
        <div className="search-container"> {/* Add search-container class */}
          <input
            type="text"
            placeholder="Search by Vaccination ID, Livestock ID, or Vaccine Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {/* Replace text with search icon */}
          <button onClick={searchVaccinations}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
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
