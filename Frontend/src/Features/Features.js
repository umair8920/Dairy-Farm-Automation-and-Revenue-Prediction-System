import React from 'react';


import './bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/css/all.css';

import Navbar from '../Navbar/navbar';
import Footer from '../Footer/footer';



const Features = () => {
  return (
    <>

<div>
      {/* Your Home component content */}
      <Navbar />
      </div>

 {/* Page Header Start */}
 <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
          <div className="container text-center py-5">
              <h1 className="display-3 text-white mb-4 animated slideInDown">Features </h1>
              <nav aria-label="breadcrumb animated slideInDown">
                 
              </nav>
          </div>
      </div>
      {/* Page Header End */}

    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
            <p className="section-title bg-white text-start text-primary pe-3">Why Us!</p>
            <h1 className="mb-4">Few Reasons Why People Choosing Us!</h1>
            <p className="mb-4">
            Our commitment to sustainable and ethical farming practices ensures that our products 
            are not only delicious but also produced with utmost care for the environment and the 
            well-being of our animals.
            </p>
            <p>
              <i className="fa fa-check text-primary me-3"></i>Local, sustainable, and responsible farm.
            </p>
            <p>
              <i className="fa fa-check text-primary me-3"></i>High-quality, nutrient-rich milk.
            </p>
            <p>
              <i className="fa fa-check text-primary me-3"></i>Freshness is evident.
            </p>
          </div>
          <div className="col-lg-6">
            <div className="rounded overflow-hidden">
              <div className="row g-0">
                <div className="col-sm-6 wow fadeIn" data-wow-delay="0.1s">
                  <div className="text-center bg-primary py-5 px-4">
                    <img className="img-fluid mb-4" src="img/experience.png" alt="" />
                    <h1 className="display-6 text-white" data-toggle="counter-up">
                      15
                    </h1>
                    <span className="fs-5 fw-semi-bold text-secondary">Years Experience</span>
                  </div>
                </div>
                <div className="col-sm-6 wow fadeIn" data-wow-delay="0.3s">
                  <div className="text-center bg-secondary py-5 px-4">
                    <img className="img-fluid mb-4" src="img/award.png" alt="" />
                    <h1 className="display-6" data-toggle="counter-up">
                      57
                    </h1>
                    <span className="fs-5 fw-semi-bold text-primary">Award Winning</span>
                  </div>
                </div>
                <div className="col-sm-6 wow fadeIn" data-wow-delay="0.5s">
                  <div className="text-center bg-secondary py-5 px-4">
                    <img className="img-fluid mb-4" src="img/animal.png" alt="" />
                    <h1 className="display-6" data-toggle="counter-up">
                      350
                    </h1>
                    <span className="fs-5 fw-semi-bold text-primary">Total Animals</span>
                  </div>
                </div>
                <div className="col-sm-6 wow fadeIn" data-wow-delay="0.7s">
                  <div className="text-center bg-primary py-5 px-4">
                    <img className="img-fluid mb-4" src="img/client.png" alt="" />
                    <h1 className="display-6 text-white" data-toggle="counter-up">
                      15000
                    </h1>
                    <span className="fs-5 fw-semi-bold text-secondary">Happy Clients</span>
                  </div>
                </div>
              </div>
            </div>
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

export default Features;
