import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../create-edit.css';

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
      setErrorMessage('');
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
    <div className="write-container">
     
      {errorMessage && <p className="write-alert write-alert-error">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="write-col-md-12">
        <h3 className="centered-heading">Update Order Data</h3>
          <label className="write-form-group">
            Customer Name:
            <input
              type="text"
              name="customer_name"
              value={formData.customer_name}
              onChange={handleChange}
              className="write-form-control"
            />
          </label>
          <label className="write-form-group">
            Order Date:
            <input
              type="date"
              name="order_date"
              value={formData.order_date}
              onChange={handleChange}
              className="write-form-control"
            />
          </label>
          <label className="write-form-group">
            Ship Date:
            <input
              type="date"
              name="ship_date"
              value={formData.ship_date}
              onChange={handleChange}
              className="write-form-control"
            />
          </label>
          <label className="write-form-group">
            Amount:
            <input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="write-form-control"
            />
          </label>
          <label className="write-form-group">
            Status:
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="write-form-control"
            >
              <option value="">Select Status</option>
              <option value="Delivered">Delivered</option>
              <option value="Pending">Pending</option>
              <option value="Canceled">Canceled</option>
            </select>
          </label>
          <button className="btn write-btn-primary" type="submit">
            Update Order
          </button>
        </div>
      </form>
      {successMessage && (
        <p className="write-alert write-alert-success">{successMessage}</p>
      )}
    </div>
  );
};

export default OrderUpdate;
