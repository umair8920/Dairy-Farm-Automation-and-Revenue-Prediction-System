// Navbar.js
import React from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { Outlet, Link } from "react-router-dom";

const navbar = () => {
  return (
   
  /*   <!-- Navbar Start --> */

  <>
  
    <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top px-4 px-lg-5">
        <a href="index.html" className="navbar-brand d-flex align-items-center">
        <h1 className="m-0" style={{ color: '#0A3525' }}>Dairy Land</h1>


        </a>
        <button type="button" className="navbar-toggler me-0" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto p-4 p-lg-0">
                <a href="/" className="nav-item nav-link active">Home</a>
                <Link to="/About" className="nav-item nav-link"> About</Link>
                <Link to="/Services" className="nav-item nav-link">Services</Link>
                <Link to="/Product" className="nav-item nav-link">Products</Link>
                <div className="nav-item dropdown">
                    <a href="/" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                    <div className="dropdown-menu bg-light m-0">
                        <a href="/Team" className="dropdown-item">Team</a>
                        <a href="/Features" className="dropdown-item">Features</a>
                        <a href="/Contact" className="dropdown-item">Contact</a>
                      
                    </div>
                </div>
                <a href="/CreateClientOrders" className="nav-item nav-link">Make Order</a>
               
                <div className="nav-item dropdown">
                    <a href="/" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Login As</a>
                    <div className="dropdown-menu bg-light m-0">
                        <a href="/Login" className="dropdown-item"> Owner</a>
                        <a href="/Login" className="dropdown-item"> Manager</a>
                        <a href="/Login" className="dropdown-item">Veterinarian</a>
                      
                    </div>
                </div>
            </div>
        </div>
    </nav>

<Outlet />
</>
  
  );
};

export default navbar;
