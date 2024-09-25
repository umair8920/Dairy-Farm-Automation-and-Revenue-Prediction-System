// OrdersWriteComponent.js
import React, { useState } from 'react';
import axios from 'axios';



const OrdersWriteComponent = () => {
  const [formData, setFormData] = useState({
    order_id: '',
    customer_name: '',
    order_date: '',
    ship_date: '',
    amount: '',
    status: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8081/api/orders', formData);
      setSuccessMessage('Order data added successfully!');
      // Optionally, you can fetch the updated data to refresh the list
    } catch (error) {
      console.error('Error adding Order data:', error);
      setSuccessMessage(
        `Error adding Order data. Please try again. ${error.message}`
      );
    }
  };

  return (
    <div className="write-container">
         
      <form onSubmit={handleSubmit}>
        <div className="write-col-md-12">
          <h3 className="centered-heading">Add Vaccinations Details</h3>
          <label className="write-form-group">
            Purchase ID:
            <input
              type="text"
              name="order_id"
              value={formData.order_id}
              onChange={handleChange}
              className="write-form-control"
            />
          </label>
          <label className="write-form-group">
            Supplier Name:
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
            Add Order
          </button>
        </div>
      </form>
      {successMessage && (
        <p className="write-alert write-alert-success">{successMessage}</p>
      )}
    </div>
  );
};

export default OrdersWriteComponent;
