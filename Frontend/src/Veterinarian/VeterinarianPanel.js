import React from 'react';
import { Link } from 'react-router-dom';
import '@mdi/font/css/materialdesignicons.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import './sidebar.css'




const VeterinarianPanel = () => {

  return (
    <>
   
      
    <aside className="left-sidebar sidebar-dark" id="left-sidebar">
      <div id="sidebar" className="sidebar sidebar-with-footer">
        
        {/* Aplication Brand */}
        <div className="app-brand">
          <Link to="#">
            <img src="img/logo.png" alt="Mono" />
            <span className="brand-name">Dairy Land</span>
          </Link>

          <div className="line"></div>
        </div>
        {/* begin sidebar scrollbar */}
        <div className="sidebar-left" data-simplebar style={{ height: '100%' }}>
          {/* sidebar menu */}
          <ul className="nav sidebar-inner" id="sidebar-menu">
            <li className="nav-item">
              <Link to="/Weather" className="nav-link">
                <i className="mdi mdi-briefcase-account-outline"></i>
                <span className="nav-text">Weather Forecast</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/CalenderVet" className="nav-link">
                <i className="mdi mdi-briefcase-account-outline"></i>
                <span className="nav-text">Event Calender </span>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/ReadLivestockVet" className="nav-link">
                <i className="mdi mdi-chart-line"></i>
                <span className="nav-text">Livestock Data</span>
              </Link>
            </li>
       
            <li className="nav-item">
              <Link to="/ReadVaccinationvet" className="nav-link">
                <i className="mdi mdi-chart-line"></i>
                <span className="nav-text"> Vaccination</span>
              </Link>
              
            </li>
            
            
          
            <li className="nav-item">
              <Link to="/VacOrder" className="nav-link">
                <i className="mdi mdi-chart-line"></i>
                <span className="nav-text"> Vaccination Purchases</span>
              </Link>
              
            </li>

         

            <li className="nav-item">
              <Link to="/CalenderVet" className="nav-link">
                <i className="mdi mdi-chart-line"></i>
                <span className="nav-text"> Add Precautions</span>
              </Link>
              
            </li>

            <li className="nav-item">
              <Link to="/analytics.html" className="nav-link">
                <i className="a"></i>
                <span className="nav-text"> </span>
              </Link>
              
            </li>
            <li className="nav-item">
              <Link to="/analytics.html" className="nav-link">
                <i className="a"></i>
                <span className="nav-text"> </span>
              </Link>
              
            </li>
         
            
            <li className="nav-item">
              <Link to="/analytics.html" className="nav-link">
                <i className="a"></i>
                <span className="nav-text"> </span>
              </Link>
              
            </li>
            <li className="nav-item">
              <Link to="/analytics.html" className="nav-link">
                <i className="a"></i>
                <span className="nav-text"> </span>
              </Link>
              
            </li>
           
            
            <div>
  <li className="nav-item">
    <Link to="/production" className="nav-link">
   
      <span className="nav-text"> </span>
    </Link>
  </li>
</div>
          


          


      



            {/* Add more menu items as needed */}
          </ul>
          
        
        </div>
        
      </div>
    </aside>

     
    <div className="page-wrapper">

      {/* Header */}
      <header className="main-header" id="header">
        <nav className="navbar navbar-expand-lg navbar-light" id="navbar">
          {/* Sidebar toggle button */}
         
          <span className="page-title">Veterinarian Dashboard</span>
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

export default VeterinarianPanel;
