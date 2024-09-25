import React from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/css/all.css';


import Navbar from '../Navbar/navbar';
import Footer from '../Footer/footer';

const Product = () => {
  return (
    <>
    <div>
      {/* Your Home component content */}
      <Navbar />
      </div>
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center mx-auto wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '500px' }}>
          <p className="section-title bg-white text-center text-primary px-3">Our Products</p>
          <h1 className="mb-5">Our Dairy Products For Healthy Living</h1>
        </div>
        <div className="row gx-4">
          <div className="col-md-6 col-lg-4 col-xl-3 wow fadeInUp" data-wow-delay="0.1s">
            <div className="product-item">
              <div className="position-relative">
                <img className="img-fluid" src="img/product-1.jpg" alt="" />
                <div className="product-overlay">
                  <a className="btn btn-square btn-secondary rounded-circle m-1" href="/CreateClientOrders"><i className="bi bi-cart"></i></a>
                </div>
              </div>
              <div className="text-center p-4">
                <a className="d-block h5" href="/">Pure Milk</a>
                <span className="text-decoration-line-through"></span>
              </div>
            </div>
          </div>
          {/* Add similar code blocks for other products */}

          <div className="col-md-6 col-lg-4 col-xl-3 wow fadeInUp" data-wow-delay="0.1s">
            <div className="product-item">
              <div className="position-relative">
                <img className="img-fluid" src="img/product-3.jpg" alt="" />
                <div className="product-overlay">
                  <a className="btn btn-square btn-secondary rounded-circle m-1" href="/CreateClientOrders"><i className="bi bi-cart"></i></a>
                </div>
              </div>
              <div className="text-center p-4">
                <a className="d-block h5" href="/">Dairy Products</a>
                <span className="text-decoration-line-through"></span>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-4 col-xl-3 wow fadeInUp" data-wow-delay="0.1s">
            <div className="product-item">
              <div className="position-relative">
                <img className="img-fluid" src="/img/service-1.jpg" alt="" />
                <div className="product-overlay">
                  <a className="btn btn-square btn-secondary rounded-circle m-1" href="/CreateClientOrders"><i className="bi bi-cart"></i></a>
                </div>
              </div>
              <div className="text-center p-4">
                <a className="d-block h5" href="/">Animal Supply</a>
                <span className="text-decoration-line-through"></span>
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

export default Product;
