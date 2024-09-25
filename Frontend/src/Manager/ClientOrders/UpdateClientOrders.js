import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../create-edit.css';

const UpdateClientOrders = () => {
    const { id } = useParams(); // Use "id" instead of "orderId"
  const [order, setOrder] = useState({});
  const [formData, setFormData] = useState({
    client_name: '',
    phone: '',
    shipping_address: '',
    item: '',
    quantity: '',
    order_date: '',
    delivery_date: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch order data when component mounts
    fetchOrderData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchOrderData = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/clientorders/${id}`); // Use "id" instead of "orderId"
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
      await axios.put(`http://localhost:8081/api/clientorders/${id}`, formData); // Use "id" instead of "orderId"
      setSuccessMessage('Client order data updated successfully!');
    } catch (error) {
      console.error('Error updating client order data:', error);
      setErrorMessage('Error updating client order data. Please try again.');
    }
  };

  return (
    <div className="write-container">
      {errorMessage && <p className="write-alert write-alert-error">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="write-col-md-12">
          <h3 className="centered-heading">Update Client Order Data</h3>
          <label className="write-form-group">
            Client Name:
            <input
              type="text"
              name="client_name"
              value={formData.client_name}
              onChange={handleChange}
              className="write-form-control"
            />
          </label>
          <label className="write-form-group">
            Phone:
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="write-form-control"
            />
          </label>
          <label className="write-form-group">
            Shipping Address:
            <input
              type="text"
              name="shipping_address"
              value={formData.shipping_address}
              onChange={handleChange}
              className="write-form-control"
            />
          </label>
          <label className="write-form-group">
            Item:
            <input
              type="text"
              name="item"
              value={formData.item}
              onChange={handleChange}
              className="write-form-control"
            />
          </label>
          <label className="write-form-group">
            Quantity:
            <input
              type="text"
              name="quantity"
              value={formData.quantity}
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
            Delivery Date:
            <input
              type="date"
              name="delivery_date"
              value={formData.delivery_date}
              onChange={handleChange}
              className="write-form-control"
            />
          </label>
          <button className="btn write-btn-primary" type="submit">
            Update Client Order
          </button>
        </div>
      </form>
      {successMessage && (
        <p className="write-alert write-alert-success">{successMessage}</p>
      )}
    </div>
  );
};

export default UpdateClientOrders;
