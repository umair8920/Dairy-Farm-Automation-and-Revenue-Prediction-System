
import React from 'react';
import './style.css';
import './bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from '../Navbar/navbar';
import Footer from '../Footer/footer';



const home = () => {
  return (

    <div>
      {/* Your Home component content */}
      <Navbar />
      
    
    <div className="container-fluid px-0 mb-5">
      <div id="header-carousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="w-100" src="img/home-1.jpg" alt="aa" />
            <div className="carousel-caption">
              <div className="container">
                <div className="row justify-content-start">
                 {/*  <div className="col-lg-8 text-start">
                    <p className="fs-4 text-black">Welcome to our dairy farm</p>
                    <h1 className="display-1 text-black mb-5 animated slideInRight">The Farm of Dairy products</h1>
                    <a href="/" className="btn btn-secondary rounded-pill py-3 px-5 animated slideInRight">Explore More</a>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img className="w-100" src="img/home-2.jpg" alt="abc" />
            <div className="carousel-caption">
              <div className="container">
                <div className="row justify-content-end">
                  <div className="col-lg-8 text-end">
                    <a href="/about" className="btn btn-secondary rounded-pill py-3 px-5 animated slideInLeft">Explore More</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#header-carousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#header-carousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

     
      </div>
    <div>
  
      
      <Footer />
      </div>
    </div>
    
  );
};

export default home;
