import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSearch } from '@fortawesome/free-solid-svg-icons';
import './livestock.css'; // Import the provided CSS file
import ManagerPanel from '../ManagerPanel';

// Initialize totalMilkQuantity and totalMilkCost variables outside the component
export let totalMilkQuantity = 0;
export let totalMilkCost = 0;

const ReadMilkProduction = () => {
  const [milkProductions, setMilkProductions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/milkproductions');
      setMilkProductions(response.data);

      // Calculate the total milk quantity and total milk cost
      totalMilkQuantity = response.data.reduce((acc, production) => acc + parseFloat(production.milk_quantity), 0);
      totalMilkCost = response.data.reduce((acc, production) => acc + parseFloat(production.milk_cost), 0);
    } catch (error) {
      console.error('Error fetching Milk Production data:', error);
    }
  };

  const handleDelete = async (production_id) => {
    try {
      await axios.delete(`http://localhost:8081/api/milkproductions/${production_id}`);
      fetchData(); // Refresh the data after deletion
    } catch (error) {
      console.error('Error deleting Milk Production data:', error);
    }
  };

  const searchMilkProductions = () => {
    if (!searchQuery) {
      fetchData(); // If search query is empty, fetch all milk productions
      return;
    }
    // Filter milk productions by production_id or livestock_id
    const filteredMilkProductions = milkProductions.filter(production => 
      production.production_id.toString().includes(searchQuery) || 
      production.livestock_id.toString().includes(searchQuery)
    );
    setMilkProductions(filteredMilkProductions);
  };

  return (
    <div>
      <ManagerPanel />
      <div className="container">
        <h1 className="centered-heading">Milk Production Records</h1>
        <div className="search-container"> {/* Add search-container class */}
          <input
            type="text"
            placeholder="Search by Production ID or Livestock ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {/* Replace text with search icon */}
          <button onClick={searchMilkProductions}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Production ID</th>
              <th>Livestock ID</th>
              <th>Production Date</th>
              <th>Milk Quantity In kg</th>
              <th>Milk Cost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {milkProductions.map((production) => (
              <tr key={production.production_id}>
                <td>{production.production_id}</td>
                <td>{production.livestock_id}</td>
                <td>{production.production_date}</td>
                <td>{production.milk_quantity}</td>
                <td>{production.milk_cost}</td>
                <td>
                  <Link to={`/UpdateMilkProduction/${production.production_id}`}>
                    <FontAwesomeIcon icon={faEdit} style={{ marginRight: '10px' }} />
                  </Link>
                  <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(production.production_id)} />
                </td>
              </tr>
            ))}
            {/* Add a row to display total milk quantity and total milk cost */}
            <tr>
              <td colSpan="3"></td>
              <td><strong>Total Milk Quantity:</strong> {totalMilkQuantity}</td>
              <td><strong>Total Milk Cost:</strong> {totalMilkCost}</td>
              <td colSpan="2"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReadMilkProduction;
