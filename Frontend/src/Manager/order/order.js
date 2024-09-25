import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../read.css';
import ManagerPanel from '../ManagerPanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSearch } from '@fortawesome/free-solid-svg-icons';

const OrdersComponent = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/orders');
      setOrdersData(response.data);

      // Calculate the sum of all amount values
      const sum = response.data.reduce((acc, order) => acc + parseFloat(order.amount), 0);
      setTotalAmount(sum);
    } catch (error) {
      console.error('Error fetching Orders data:', error);
    }
  };

  const handleDelete = async (order_id) => {
    console.log("Deleting order with ID:", order_id);
  
    try {
      await axios.delete(`http://localhost:8081/api/orders/${order_id}`);
      fetchData();
    } catch (error) {
      console.error(`Error deleting record with order ID ${order_id}:`, error);
    }
  };

  const searchOrders = () => {
    if (!searchQuery) {
      fetchData(); // If search query is empty, fetch all orders
      return;
    }
    // Filter orders by order_id or customer_name
    const filteredOrders = ordersData.filter(order => 
      order.order_id.toString().includes(searchQuery) || 
      order.customer_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setOrdersData(filteredOrders);
  };

  return (
    <div>
      <ManagerPanel />   
      <div className="container">

      <div className="centered-button">
          <Link to={`/ordercreate`} className="link-text">Add New Orders</Link>
      </div>
      
      <div className="row">
      <div className="container3">

         {/* Display the total amount and number of orders above the table */}
         <div className="centered-heading">
          <strong>Total Amount:</strong> {totalAmount} 
        </div>
        </div>
        
        
        <div className="container4">
        <div className="centered-heading">
         
          <strong>Number of Orders:</strong> {ordersData.length}
        </div>
        
        </div>

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
          <button onClick={searchOrders}>
              <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
       
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Order Date</th>
              <th>Ship Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ordersData.map((order) => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{order.customer_name}</td>
                <td>{order.order_date}</td>
                <td>{order.ship_date}</td>
                <td>{order.amount}</td>
                <td>{order.status}</td>
                <td>
                  <Link to={`/OrderUpdate/${order.order_id}`}>
                    <FontAwesomeIcon icon={faEdit} style={{ marginRight: '10px' }} />
                  </Link>
                  <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(order.order_id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersComponent;
