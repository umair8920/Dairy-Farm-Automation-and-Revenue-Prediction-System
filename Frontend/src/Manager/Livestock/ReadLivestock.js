import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import '../read.css'; // Import the provided CSS file
import ManagerPanel from '../ManagerPanel';

const ReadLivestock = () => {
  const [livestockData, setLivestockData] = useState([]);
  const [healthyCount, setHealthyCount] = useState(0);
  const [weakCount, setWeakCount] = useState(0);
  const [sickCount, setSickCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/livestock');
      setLivestockData(response.data);

      // Count occurrences of each health status
      let healthy = 0;
      let weak = 0;
      let sick = 0;

      response.data.forEach((livestock) => {
        if (livestock.healthstatus === 'healthy') {
          healthy++;
        } else if (livestock.healthstatus === 'weak') {
          weak++;
        } else if (livestock.healthstatus === 'sick') {
          sick++;
        }
      });

      setHealthyCount(healthy);
      setWeakCount(weak);
      setSickCount(sick);
    } catch (error) {
      console.error('Error fetching Livestock data:', error);
    }
  };

  const handleDelete = async (livestock_id) => {
    console.log("Deleting livestock with ID:", livestock_id);
  
    try {
      await axios.delete(`http://localhost:8081/api/livestock/${livestock_id}`);
      // If the delete request is successful, fetch the updated data to refresh the list
      fetchData();
    } catch (error) {
      console.error(`Error deleting record with livestock ID ${livestock_id}:`, error);
    }
  };

  return (
    <div>
      <ManagerPanel />
      <div className="container"> {/* Add container class */}
        <h1 className="centered-heading">Livestock Data</h1>
        
        <div className="centered-heading"><p>Total Number of Animals: {livestockData.length}</p> {/* Display total number of animals */}
        <p>Healthy Animals: {healthyCount}  |  Weak Animals: {weakCount} | Sick Animals: {sickCount}</p> {/* Display count of healthy animals */}
       
        </div>
        <table className="livestock-table"> {/* Add table class */}
          <thead>
            <tr>
              <th>Livestock ID</th>
              <th>Age</th>
              <th>Color</th>
              <th>Breed</th>
              <th>Gender</th>
              <th>Health Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {livestockData.map((livestock) => (
              <tr key={livestock.livestock_id}>
                <td>{livestock.livestock_id}</td>
                <td>{livestock.age}</td>
                <td>{livestock.color}</td>
                <td>{livestock.breed}</td>
                <td>{livestock.gender}</td>
                <td>{livestock.healthstatus}</td>
                <td>
                  {/* Use Link to navigate to the LivestockUpdate component */}
                  <Link to={`/UpdateLivestock/${livestock.livestock_id}`}>
                  <FontAwesomeIcon icon={faEdit} style={{ marginRight: '10px' }} />
                  </Link>
                  <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(livestock.livestock_id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReadLivestock;
