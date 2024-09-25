import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const OrderUpdate = () => {
  const { order_id } = useParams();
  const [order, setOrder] = useState({});
  const [formData, setFormData] = useState({
    customer_name: '',
    order_date: '',
    ship_date: '',
    amount: '',
    status: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch order data when component mounts
    fetchOrderData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchOrderData = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/orders/${order_id}`);
      setOrder(response.data);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching order data:', error);
      setErrorMessage('Error fetching order data. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8081/api/orders/${order_id}`, formData);
      setSuccessMessage('Order data updated successfully!');
    } catch (error) {
      console.error('Error updating order data:', error);
      setErrorMessage('Error updating order data. Please try again.');
    }
  };

  return (
    <div>
      <h3>Update Order Data</h3>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Customer Name:
          <input
            type="text"
            name="customer_name"
            value={formData.customer_name}
            onChange={handleChange}
          />
        </label>
        <label>
          Order Date:
          <input
            type="date"
            name="order_date"
            value={formData.order_date}
            onChange={handleChange}
          />
        </label>
        <label>
          Ship Date:
          <input
            type="date"
            name="ship_date"
            value={formData.ship_date}
            onChange={handleChange}
          />
        </label>
        <label>
          Amount:
          <input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
          />
        </label>
        <label>
          Status:
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="">Select Status</option>
            <option value="Delivered">Delivered</option>
            <option value="Pending">Pending</option>
            <option value="Canceled">Canceled</option>
          </select>
        </label>
        <button type="submit">Update Order</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default OrderUpdate;
