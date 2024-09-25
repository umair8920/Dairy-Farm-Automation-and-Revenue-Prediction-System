import React, { useState, useRef } from 'react';
import axios from 'axios';
import './style.css';
import './bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/css/all.css';

import Navbar from '../Navbar/navbar';
import Footer from '../Footer/footer';

const CreateClientOrders = () => {
  const form = useRef();

  const [formData, setFormData] = useState({
    id: '',
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8081/api/clientorders', formData);
      setSuccessMessage('Client order added successfully!');
      setErrorMessage('');
      // Reset the form after successful submission
      setFormData({
        id: '',
        client_name: '',
        phone: '',
        shipping_address: '',
        item: '',
        quantity: '',
        order_date: '',
        delivery_date: '',
      });
      // Optionally, you can redirect or perform other actions after successful submission
    } catch (error) {
      console.error('Error adding client order:', error);
      setSuccessMessage('');
      setErrorMessage(`Error adding client order. Please try again. ${error.message}`);
    }
  };

  return (
    <>
      <div>
        <Navbar />
      </div>

      {/* Page Header Start */}
      <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container text-center py-5">
          <h1 className="display-3 text-white mb-4 animated slideInDown">Book Order</h1>
          <nav aria-label="breadcrumb animated slideInDown"></nav>
        </div>
      </div>
      {/* Page Header End */}

      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center mx-auto wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '500px' }}>
            <p className="section-title bg-white text-center text-primary px-3">Contact Us</p>
            <h1 className="mb-5">If You Have Any Query related to orders, Please feel free to Contact Us</h1>
          </div>
          <div className="row g-5">
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
              <h3 className="mb-4">Book Order Now</h3>
              {successMessage && <div className="alert alert-success">{successMessage}</div>}
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
              <form ref={form} onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                        placeholder="ID"
                      />
                      <label htmlFor="id">Client CNIC</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        name="client_name"
                        value={formData.client_name}
                        onChange={handleChange}
                        placeholder="Client Name"
                      />
                      <label htmlFor="client_name">Client Name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Client Phone Number"
                      />
                      <label htmlFor="phone">Client Phone Number</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        name="shipping_address"
                        value={formData.shipping_address}
                        onChange={handleChange}
                        placeholder="Shipping Address"
                      />
                      <label htmlFor="shipping_address">Shipping Address</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        name="item"
                        value={formData.item}
                        onChange={handleChange}
                        placeholder="Item"
                      />
                      <label htmlFor="item">Item</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        placeholder="Quantity"
                      />
                      <label htmlFor="quantity">Quantity</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="date"
                        className="form-control"
                        name="order_date"
                        value={formData.order_date}
                        onChange={handleChange}
                        placeholder="Order Date"
                      />
                      <label htmlFor="order_date">Order Date</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="date"
                        className="form-control"
                        name="delivery_date"
                        value={formData.delivery_date}
                        onChange={handleChange}
                        placeholder="Delivery Date"
                      />
                      <label htmlFor="delivery_date">Delivery Date</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button className="btn btn-secondary rounded-pill py-3 px-5" type="submit">
                      Add Client Order
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
              <h3 className="mb-4">Contact Details</h3>
              <div className="d-flex border-bottom pb-3 mb-3">
                <div className="flex-shrink-0 btn-square bg-secondary rounded-circle">
                  <i className="fa fa-map-marker-alt text-body"></i>
                </div>
                <div className="ms-3">
                  <h6>Our Office</h6>
                  <span>Wah Cantt</span>
                </div>
              </div>
              <div className="d-flex border-bottom pb-3 mb-3">
                <div className="flex-shrink-0 btn-square bg-secondary rounded-circle">
                  <i className="fa fa-phone-alt text-body"></i>
                </div>
                <div className="ms-3">
                  <h6>Call Us</h6>
                  <span>+92 315 5592240</span>
                </div>
              </div>
              <div className="d-flex border-bottom-0 pb-3 mb-3">
                <div className="flex-shrink-0 btn-square bg-secondary rounded-circle">
                  <i className="fa fa-envelope text-body"></i>
                </div>
                <div className="ms-3">
                  <h6>Mail Us</h6>
                  <span>malikusmanashfaq10@gmail.com</span>
                </div>
              </div>
              <iframe
                className="w-100 rounded"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3317.6236457228047!2d72.78408067479971!3d33.74454683391645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfa6bc26bfa2db%3A0x2344c019578abeac!2sCOMSATS%20University%20Islamabad%2C%20Wah%20Campus!5e0!3m2!1sen!2s!4v1704565646573!5m2!1sen!2s"
                frameBorder="0"
                style={{ minHeight: '300px', border: '0' }}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
};

export default CreateClientOrders;
