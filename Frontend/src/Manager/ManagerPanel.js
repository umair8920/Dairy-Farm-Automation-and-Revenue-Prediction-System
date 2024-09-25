import React from 'react';
import { Link } from 'react-router-dom';
import '@mdi/font/css/materialdesignicons.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import './sidebar.css'
import './adminheader'



const AdminPanel = () => {

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
                <i className="mdi mdi-weather-partly-cloudy"></i>
                <span className="nav-text">Weather Forecast</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/Calender" className="nav-link">
                <i className="mdi mdi-calendar"></i>
                <span className="nav-text">Event Calendar</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/ReadClientOrders" className="nav-link">
                <i className="mdi mdi-calendar"></i>
                <span className="nav-text">Client Orders</span>
              </Link>
            </li>
            
            <div>

  <li className="nav-item">
    <Link to="/ReadMilkProduction" className="nav-link">
      <i className="mdi mdi-pail"></i>
      <span className="nav-text"> Milk Production</span>
    </Link>
  </li>
</div>

      <li className="nav-item">
       <Link to="/ReadDailyMilk" className="nav-link">
          <i className="mdi mdi-pail"></i>
          <span className="nav-text"> Daily Milk Production</span>
       </Link>
      </li>



            <li className="nav-item">
              <Link to="/analytics.html" className="nav-link">
                <i className="a"></i>
                <span className="nav-text"> </span>
              </Link>
              
            </li>


            <li className="nav-item">
              <Link to="/orders" className="nav-link">
                <i className="mdi mdi-cart-outline"></i>
                <span className="nav-text"> Orders</span>
              </Link>
              
            </li>
           
          
            <li className="nav-item">
              <Link to="/ReadFeed" className="nav-link">
                <i className="mdi mdi-sack"></i>
                <span className="nav-text"> Feed Records</span>
              </Link>
              
            </li>

            <li className="nav-item">
              <Link to="/ReadLivestock" className="nav-link">
                <i className="mdi mdi-cow"></i>
                <span className="nav-text"> LiveStock Records </span>
              </Link>
              
            </li>
            
            <li className="nav-item">
              <Link to="/ReadVaccination" className="nav-link">
                <i className="mdi mdi-needle"></i>
                <span className="nav-text"> Vaccinations  </span>
              </Link>
              
            </li>
           
            
            <li className="nav-item">
              <Link to="/ReadEmployee" className="nav-link">
                <i className="mdi mdi-account"></i>
                <span className="nav-text"> Employee </span>
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
         

          <span className="page-title"> Farm Manager Dashboard</span>
    <ul>
    <li className="dropdown user-menu">
     
        <img src="img/t-1.jpg" className="user-image rounded-circle" alt="User " />
        <span className="d-none d-lg-inline-block">Umair</span>
      
    </li>
    </ul>

    
   
        </nav>
        
        
      </header>
    </div>

   

    
    
    </>
  );
};

export default AdminPanel;
