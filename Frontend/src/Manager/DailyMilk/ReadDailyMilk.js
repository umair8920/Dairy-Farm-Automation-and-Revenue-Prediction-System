import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSearch } from '@fortawesome/free-solid-svg-icons';
import '../read.css';
import { Link } from 'react-router-dom';
import ManagerPanel from '../ManagerPanel';

const ReadDailyMilk = () => {
  const [dailyMilkRecords, setDailyMilkRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/dailymilk');
      setDailyMilkRecords(response.data);
    } catch (error) {
      console.error('Error fetching daily milk records:', error);
    }
  };

  const handleDelete = async (milk_id) => {
    console.log("Deleting daily milk record with ID:", milk_id);
  
    try {
      await axios.delete(`http://localhost:8081/api/dailymilk/${milk_id}`);
      // If the delete request is successful, fetch the updated data to refresh the list
      fetchData();
    } catch (error) {
      console.error(`Error deleting daily milk record with ID ${milk_id}:`, error);
    }
  };

  const searchDailyMilkRecords = () => {
    if (!searchQuery) {
      fetchData(); // If search query is empty, fetch all daily milk records
      return;
    }
    // Filter daily milk records by milk_id or date
    const filteredRecords = dailyMilkRecords.filter(record => 
      record.milk_id.toString().includes(searchQuery) || 
      record.date.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setDailyMilkRecords(filteredRecords);
  };

  return (

    <div>
    <ManagerPanel />
    <div className="container"> {/* Add container class */}
      <h1 className="centered-heading">Daily Milk Records</h1>
      <div className="search-container"> {/* Add search-container class */}
        <input
          type="text"
          placeholder="Search by Milk ID or Date"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* Replace text with search icon */}
        <button onClick={searchDailyMilkRecords}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <table> {/* Add table class */}
        <thead>
          <tr>
            <th>Milk ID</th>
            <th>Date</th>
            <th>Price</th>
            <th>Quantity In Liters</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dailyMilkRecords.map((record) => (
            <tr key={record.milk_id}>
              <td>{record.milk_id}</td>
              <td>{record.date}</td>
              <td>{record.price}</td>
              <td>{record.quantity}</td>
              <td>
              <Link to={`/UpdateDailyMilk/${record.milk_id}`}>
                    <FontAwesomeIcon icon={faEdit} style={{ marginRight: '10px' }} />
                  </Link>
                <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(record.milk_id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default ReadDailyMilk;
