
import React from 'react';
import './style.css';
import './bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap-icons/font/bootstrap-icons.css';




const footer = () => {
  return (
    <>
    
      {/* Footer Start */}
      <div className="container-fluid bg-dark footer mt-5 py-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-3 col-md-6">
              <h5 className="text-white mb-4">Our Office</h5>
              <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i>Wah Cantt, Taxila, Rawalpindi</p>
              <p className="mb-2"><i className="fa fa-phone-alt me-3"></i>+92 315 5592240</p>
              <p className="mb-2"><i className="fa fa-envelope me-3"></i>uwinning50@gmail.com</p>
            </div>
            <div className="col-lg-3 col-md-6">
              <h5 className="text-white mb-4">Quick Links</h5>
              <a className="btn btn-link" href="/About">About Us</a>
              <a className="btn btn-link" href="/Contact">Contact Us</a>
              <a className="btn btn-link" href="/Services">Our Services</a>
            </div>
            <div className="col-lg-3 col-md-6">
              <h5 className="text-white mb-4">Business Hours</h5>
              <p className="mb-1">Monday - Friday</p>
              <h6 className="text-light">09:00 am - 07:00 pm</h6>
              <p className="mb-1">Saturday</p>
              <h6 className="text-light">09:00 am - 12:00 pm</h6>
              <p className="mb-1">Sunday</p>
              <h6 className="text-light">Closed</h6>
            </div>
            <div className="col-lg-3 col-md-6">
              <h5 className="text-white mb-4">Newsletter</h5>
              <p>Send us email for orders and bookings.</p>
              <div className="position-relative w-100">
                <input className="form-control bg-transparent w-100 py-3 ps-4 pe-5" type="text" placeholder="Your email" />
                <button type="button" className="btn btn-secondary py-2 position-absolute top-0 end-0 mt-2 me-2">SignUp</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer End */}

      {/* Copyright Start */}
      <div className="container-fluid bg-secondary text-body copyright py-4">
        <div className="container">
          <div className="row">
           
          </div>
        </div>
      </div>
      {/* Copyright End */}
    </>
  );
};

export default footer;
