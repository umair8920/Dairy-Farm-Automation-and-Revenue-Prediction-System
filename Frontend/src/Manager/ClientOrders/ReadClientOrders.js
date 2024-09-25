import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSearch } from '@fortawesome/free-solid-svg-icons';
import '../read.css';
import ManagerPanel from '../ManagerPanel';

const ReadClientOrders = () => {
  const [clientOrdersData, setClientOrdersData] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/clientorders');
      setClientOrdersData(response.data);

      // Calculate the total number of client orders
      setTotalOrders(response.data.length);
    } catch (error) {
      console.error('Error fetching client orders data:', error);
    }
  };

  const handleDelete = async (id) => {
    console.log("Deleting client order with ID:", id);
  
    try {
      await axios.delete(`http://localhost:8081/api/clientorders/${id}`);
      fetchData();
    } catch (error) {
      console.error(`Error deleting client order with ID ${id}:`, error);
    }
  };

  const searchClientOrders = () => {
    if (!searchQuery) {
      fetchData(); // If search query is empty, fetch all client orders
      return;
    }
    // Filter client orders by id or client_name
    const filteredClientOrders = clientOrdersData.filter(order => 
      order.id.toString().includes(searchQuery) || 
      order.client_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setClientOrdersData(filteredClientOrders);
  };

  return (
<div>
    <ManagerPanel /> 
    <div>
      <div className="container">
        <h1 className="centered-heading"><strong>Client Orders Data</strong></h1>

        {/* Display the total number of client orders above the table */}
        <div className="centered-heading">
          <strong>Total Number of Orders:</strong> {totalOrders}
        </div>

        {/* Search input and button */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by ID/Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {/* Replace text with search icon */}
          <button onClick={searchClientOrders}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Client Name</th>
              <th>Phone</th>
              <th>Shipping Address</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Order Date</th>
              <th>Delivery Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {clientOrdersData.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.client_name}</td>
                <td>{order.phone}</td>
                <td>{order.shipping_address}</td>
                <td>{order.item}</td>
                <td>{order.quantity}</td>
                <td>{order.order_date}</td>
                <td>{order.delivery_date}</td>
                <td>
                  <Link to={`/UpdateClientOrders/${order.id}`}>
                    <FontAwesomeIcon icon={faEdit} style={{ marginRight: '10px' }} />
                  </Link>
                  <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(order.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default ReadClientOrders;
