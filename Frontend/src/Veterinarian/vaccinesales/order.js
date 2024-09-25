import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './livestock.css';
import VeterinarianPanel from '../VeterinarianPanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import VacOrdercreate from './ordercreate';


const OrdersComponent = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

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
    console.log("Deleting livestock with ID:", order_id);
  
    try {
      await axios.delete(`http://localhost:8081/api/orders/${order_id}`);
      fetchData();
    } catch (error) {
      console.error(`Error deleting record with order ID ${order_id}:`, error);
    }
  };

  return (
    <div>
      <VeterinarianPanel />   
      <div className="container">
        <h1 className="centered-heading"><strong>Vaccinations Expenditures Data </strong> </h1>
        {/* Display the total amount and number of orders above the table */}
        <div className="centered-heading">
          <strong>Total Amount:</strong> {totalAmount} |
          
          <strong>Number of Orders:</strong> {ordersData.length}
        </div>
        <table>
          <thead>
            <tr>
              <th>Purchase ID</th>
              <th>Supplier Name</th>
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
<VacOrdercreate/>
    
    </div>
  );
};

export default OrdersComponent;
