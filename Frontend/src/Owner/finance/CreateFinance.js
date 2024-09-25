
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../create-edit.css';

const CreateFinance = () => {
  const [formData, setFormData] = useState({
    order_id: '',
    amount: '',
    milk_id: '',
    price: '',
    quantity: '',
    feed_id: '',
    cost: '',
    date:'date'
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [orders, setOrders] = useState([]);
  const [orderAmounts, setOrderAmounts] = useState([]);
  const [milkTypes, setMilkTypes] = useState([]);
  const [dailymilkQuantity, setdailymilkQuantity] = useState([]);
  const [dailymilkprice, setdailymilkprice] = useState([]);

  const [feeds, setFeeds] = useState([]);
  const [feedcost, setFeedcost] = useState([]);
  useEffect(() => {
    fetchOrders();
    fetchMilkTypes();
    fetchFeeds();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/orders');
      setOrders(response.data);
      // Extract amount values from orders and set them for the dropdown menu
      const amount = response.data.map(order => order.amount);
      setOrderAmounts(amount);
    } catch (error) {
      console.error('Error fetching Orders data:', error);
    }
  };


  const fetchMilkTypes = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/dailymilk');
      setMilkTypes(response.data);
      const quantity = response.data.map(dailymilk => dailymilk.quantity);
      setdailymilkQuantity(quantity);
      const price = response.data.map(dailymilk => dailymilk.price);
      setdailymilkprice(price);
    } catch (error) {
      console.error('Error fetching Milk Types data:', error);
    }
  };

  const fetchFeeds = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/feeds');
      setFeeds(response.data);
      const cost = response.data.map(feed => feed.cost);
      setFeedcost(cost);
    } catch (error) {
      console.error('Error fetching Feeds data:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8081/api/finances', formData);
      setSuccessMessage('Finance data added successfully!');
      // Clear the form data after successful submission
      setFormData({
        order_id: '',
        amount: '',
        milk_id: '',
        price: '',
        quantity: '',
        feed_id: '',
        cost: ''
      });
    } catch (error) {
      console.error('Error adding Finance data:', error);
    }
  };

  return (
    <div className="write-container">
      <h1 className="centered-heading">Add New Finance Record</h1>
      <form onSubmit={handleSubmit} className="create-form">
        <div className="write-col-md-12">
        <label className="write-form-group">
            Order ID:
            <select
              name="order_id"
              value={formData.order_id}
              onChange={handleChange}
              className="write-form-control"
            >
              <option value="">Select Order ID</option>
              {orders.map((order) => (
                <option key={order.order_id} value={order.order_id}>
                  {order.order_id}
                </option>
              ))}
            </select>
          </label>
          <label className="write-form-group">
            Amount:
            <select
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="write-form-control"
            >
              <option value="">Select Amount</option>
              {orderAmounts.map((amount, index) => (
                <option key={index} value={amount}>
                  {amount}
                </option>
              ))}
            </select>
          </label>
          <label className="write-form-group">
            Milk ID:
            <select
              name="milk_id"
              value={formData.milk_id}
              onChange={handleChange}
              className="write-form-control"
            >
              <option value="">Select Milk ID</option>
              {milkTypes.map((milk) => (
                <option key={milk.milk_id} value={milk.milk_id}>
                  {milk.milk_id}
                </option>
              ))}
            </select>
          </label>
          <label className="write-form-group">
            price:
            <select
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="write-form-control"
            >
              <option value="">Select price</option>
              {dailymilkprice.map((price, index) => (
                <option key={index} value={price}>
                  {price}
                </option>
              ))}
            </select>
          </label>
          <label className="write-form-group">
            quantity:
            <select
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="write-form-control"
            >
              <option value="">Select quantity</option>
              {dailymilkQuantity.map((quantity, index) => (
                <option key={index} value={quantity}>
                  {quantity}
                </option>
              ))}
            </select>
          </label>
          
          <label className="write-form-group">
            Feed ID:
            <select
              name="feed_id"
              value={formData.feed_id}
              onChange={handleChange}
              className="write-form-control"
            >
              <option value="">Select Feed ID</option>
              {feeds.map((feed) => (
                <option key={feed.feed_id} value={feed.feed_id}>
                  {feed.feed_id}
                </option>
              ))}
            </select>
          </label>
          <label className="write-form-group">
            cost:
            <select
              name="cost"
              value={formData.cost}
              onChange={handleChange}
              className="write-form-control"
            >
              <option value="">Select Cost</option>
              {feedcost.map((cost, index) => (
                <option key={index} value={cost}>
                  {cost}
                </option>
              ))}
            </select>
          </label>
          <label className="write-form-group">
             Date:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="write-form-control"
            />
             </label>
          <button className="btn write-btn-primary" type="submit">
            Add Finance Record
          </button>
        </div>
      </form>
      {successMessage && <p className="write-alert write-alert-success">{successMessage}</p>}
    </div>
  );
};

export default CreateFinance;
