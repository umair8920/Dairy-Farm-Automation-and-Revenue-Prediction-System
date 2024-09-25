import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './style.css';
import './bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/css/all.css';

import Navbar from '../Navbar/navbar';
import Footer from '../Footer/footer';

const Contact = () => {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_4y202on', 'template_nqpnykh', form.current, {
        publicKey: 'lNeywxx76_9rHEJ4H',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
      e.target.reset()
  };

  return (

    <>
    <div>
      {/* Your Home component content */}
      <Navbar />
      </div>
       {/* Page Header Start */}
       <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
          <div className="container text-center py-5">
              <h1 className="display-3 text-white mb-4 animated slideInDown">Contact Us</h1>
              <nav aria-label="breadcrumb animated slideInDown">
                 
              </nav>
          </div>
      </div>
      {/* Page Header End */}

    <div className="container-xxl py-5">
      <div className="container">
        <div
          className="text-center mx-auto wow fadeInUp"
          data-wow-delay="0.1s"
          style={{ maxWidth: '500px' }}
        >
          <p className="section-title bg-white text-center text-primary px-3">
            Contact Us
          </p>
          <h1 className="mb-5">If You Have Any Query, Please Contact Us</h1>
        </div>
        <div className="row g-5">
          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
            <h3 className="mb-4">Contact for Further Details.</h3>
           
            <form ref={form} onSubmit={sendEmail}>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      
                      placeholder="Your Name"
                      name="user_name" 
                    />
                    <label htmlFor="name">Your Name</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control"
                      name="user_email"
                      placeholder="Your Email"
                    />
                    <label htmlFor="email">Your Email</label>
                  </div>
                </div>
                
                <div className="col-12">
                  <div className="form-floating">
                    <textarea
                      className="form-control"
                      placeholder="Leave a message here"
                      name="message"
                      style={{ height: '250px' }}
                    ></textarea>
                    <label htmlFor="message">Message</label>
                  </div>
                </div>
                <div className="col-12">
                  <button
                    className="btn btn-secondary rounded-pill py-3 px-5"
                    type="submit"
                    value="Send"
                  >
                    Send Message
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
                <h6>Mail Usman</h6>
                <span>malikusmanashfaq10@gmail.com</span>
              </div>
            </div>

            <iframe
              className="w-100 rounded"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3317.6236457228047!2d72.78408067479971!3d33.74454683391645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfa6bc26bfa2db%3A0x2344c019578abeac!2sCOMSATS%20University%20Islamabad%2C%20Wah%20Campus!5e0!3m2!1sen!2s!4v1704565646573!5m2!1sen!2s"
              frameborder="0"
              style={{ minHeight: '300px', border: '0' }}
              allowfullscreen=""
              aria-hidden="false"
              tabindex="0"
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



export default Contact;
