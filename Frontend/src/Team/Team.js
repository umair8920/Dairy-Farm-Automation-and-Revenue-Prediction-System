import React from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/css/all.css';


import Navbar from '../Navbar/navbar';
import Footer from '../Footer/footer';


const Team = () => {
  return (
<>

<div>
      {/* Your Home component content */}
      <Navbar />
      </div>
     {/* Page Header Start */}
     <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
     <div className="container text-center py-5">
         <h1 className="display-3 text-white mb-4 animated slideInDown">Our Team</h1>
         <nav aria-label="breadcrumb animated slideInDown">
            
         </nav>
     </div>
 </div>
 {/* Page Header End */}
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center mx-auto wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '500px' }}>
        <p className="section-title bg-white text-center px-3" style={{ color: 'green' }}>Our Team</p>

          <h1 className="mb-5">Experienced Team Members</h1>
        </div>
        <div className="row g-4">
          <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
            <div className="team-item rounded p-4">
              <img className="img-fluid rounded mb-4" src="img/team-1.jpg" alt="Adam Crew" />
              <h5>Usman Malik</h5>
              <p className="text-primary">Manager</p>
              <div className="d-flex justify-content-center">
                <a className="btn btn-square btn-outline-secondary rounded-circle mx-1" href="https://www.facebook.com/profile.php?id=100016136778060&mibextid=LQQJ4d"><i className="fab fa-facebook-f"></i></a>
                <a className="btn btn-square btn-outline-secondary rounded-circle mx-1" href="https://www.instagram.com/_usman_malikk?igsh=d2xiY2JjaHF2ZmI="><i className="fab fa-instagram"></i></a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
            <div className="team-item rounded p-4">
              <img className="img-fluid rounded mb-4" src="img/team-2.jpg" alt="Mr Mian Muhammad Talha" />
              <h5>Doris Jordan</h5>
              <p className="text-primary">Owner</p>
              <div className="d-flex justify-content-center">
                <a className="btn btn-square btn-outline-secondary rounded-circle mx-1" href="https://www.facebook.com/share/jMTgXUrbLex7frpn/?mibextid=LQQJ4d"><i className="fab fa-facebook-f"></i></a>
                <a className="btn btn-square btn-outline-secondary rounded-circle mx-1" href="https://www.instagram.com/iammianmtalha?igsh=eGRhMzVocXRhdzR4"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
            <div className="team-item rounded p-4">
              <img className="img-fluid rounded mb-4" src="img/team-3.jpg" alt="Umair Winning" />
              <h5>Jack Dawson</h5>
              <p className="text-primary">Veterinarian</p>
              <div className="d-flex justify-content-center">
                <a className="btn btn-square btn-outline-secondary rounded-circle mx-1" href="https://www.facebook.com/umair.winning.7?mibextid=LQQJ4d"><i className="fab fa-facebook-f"></i></a>
                <a className="btn btn-square btn-outline-secondary rounded-circle mx-1" href="https://www.instagram.com/umri.89?igsh=cHl3ZWExOXJhNjVy&utm_source=qr"><i className="fab fa-instagram"></i></a>
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

export default Team;
