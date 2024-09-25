import React from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/css/all.css';

import Navbar from '../Navbar/navbar';
import Footer from '../Footer/footer';

const About = () => {
  return (
    <>

<div>
      {/* Your Home component content */}
      <Navbar />
      </div>
      {/* Page Header Start */}
      <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
          <div className="container text-center py-5">
              <h1 className="display-3 text-white mb-4 animated slideInDown">About Us</h1>
              <nav aria-label="breadcrumb animated slideInDown">
                 
              </nav>
          </div>
      </div>
      {/* Page Header End */}

      {/* About Start */}
      <div className="container-xxl py-5">
          <div className="container">
              <div className="row g-5 align-items-end">
                  <div className="col-lg-6">
                      <div className="row g-2">
                          <div className="col-6 position-relative wow fadeIn" data-wow-delay="0.7s">
                              <div className="about-experience bg-secondary rounded">
                                  <h1 className="display-1 mb-0">15</h1>
                                  <small className="fs-5 fw-bold">Years Experience</small>
                              </div>
                          </div>
                          <div className="col-6 wow fadeIn" data-wow-delay="0.1s">
                              <img className="img-fluid rounded" src="img/service-1.jpg" alt="" />
                          </div>
                          <div className="col-6 wow fadeIn" data-wow-delay="0.3s">
                              <img className="img-fluid rounded" src="img/service-2.jpg" alt="" />
                          </div>
                          <div className="col-6 wow fadeIn" data-wow-delay="0.5s">
                              <img className="img-fluid rounded" src="img/service-3.jpg" alt="" />
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                      <p className="section-title bg-white text-start text-primary pe-3">About Us</p>
                      <h1 className="mb-4">Know About Our Dairy Farm & Our History</h1>
                      <p className="mb-4">We have been working in this field for fifteen years, and we are known for our best quality milk. We have thousands of happy customers.</p>
                      <div className="row g-5 pt-2 mb-5">
                          <div className="col-sm-6">
                              <img className="img-fluid mb-4" src="img/service.png" alt="" />
                              <h5 className="mb-3">Dedicated Services</h5>
                              <span>We offer pre-orders and bookings of milk for different types of events.</span>
                          </div>
                          <div className="col-sm-6">
                              <img className="img-fluid mb-4" src="img/product.png" alt="" />
                              <h5 className="mb-3">Organic Milk</h5>
                              <span>We offer pure organic milk.</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

           {/* About End */}

      

    {/* <!-- Banner Start --> */}
    <div className="container-fluid banner my-5 py-5" data-image-src="img/banner.jpg">
        <div className="container py-5">
            <div className="row g-5">
                <div className="col-lg-6 wow fadeIn" data-wow-delay="0.3s">
                    <div className="row g-4 align-items-center">
                        <div className="col-sm-4">
                            <img className="img-fluid rounded" src="img/banner-1.jpg" alt=""/>
                        </div>
                        <div className="col-sm-8">
                            <h2 className="text-black mb-3">We Sell Best Dairy Products</h2>
                            <p className="mb-3">
                                Our dairy products are sourced from local farm, ensuring freshness and quality. From creamy milk to delicious cheeses and yogurts, we offer a wide range of options to satisfy your cravings. Taste the difference with our premium dairy selection!
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                    <div className="row g-4 align-items-center">
                        <div className="col-sm-4">
                            <img className="img-fluid rounded" src="img/banner-2.jpg" alt=""/>
                        </div>
                        <div className="col-sm-8">
                            <h2 className="text-black mb-3">We Deliver Fresh Milk.</h2>
                            <p className="mb-3">
                                Enjoy the goodness of farm-fresh milk delivered right to your doorstep. Our milk is sourced from healthy cows and undergoes rigorous quality checks to ensure purity and freshness. Experience the difference with our nutritious and delicious milk today!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  {/*   <!-- Banner End --> */}

           
      </div>
      <div>
      <Footer />
      </div>
    </>
  );
};

export default About;
