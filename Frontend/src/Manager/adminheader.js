
import React from 'react';

import '@mdi/font/css/materialdesignicons.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sidebar.css'

const adminheader= () => {
  return (
    <>
    
    <div className="page-wrapper">

      {/* Header */}
      <header className="main-header" id="header">
        <nav className="navbar navbar-expand-lg navbar-light" id="navbar">
          {/* Sidebar toggle button */}
          <button id="sidebar-toggler" className="sidebar-toggle">
            <span className="sr-only">Toggle navigation</span>
          </button>

          <span className="page-title">dashboard</span>
    <ul>
    <li className="dropdown user-menu">
     
        <img src="img/t-1.jpg" className="user-image rounded-circle" alt="User " />
        <span className="d-none d-lg-inline-block">Usman</span>
      
    </li>
    </ul>
   
        </nav>
        
        
      </header>
    </div>

   
    </>
  );
};

export default adminheader;
