import React from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


import Navbar from '../Navbar/navbar';
import Footer from '../Footer/footer';


const Services = () => {
    return (
        <>
        <div>
      {/* Your Home component content */}
      <Navbar />
      </div>
        
            {/* Page Header Start */}
            <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="container text-center py-5">
                    <h1 className="display-3 text-white mb-4 animated slideInDown">Services</h1>
                    <nav aria-label="breadcrumb animated slideInDown">
                        
                    </nav>
                </div>
            </div>
            {/* Page Header End */}

            {/* Service Start */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center mx-auto pb-4 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '500px' }}>
                        <p className="section-title bg-white text-center text-primary px-3">Our Services</p>
                        <h1 className="mb-5">Services That We Offer.</h1>
                    </div>
                    <div className="row gy-5 gx-4">
                        {/* Service items go here */}
                        {/* Service Item 1 */}
                        <div className="col-lg-4 col-md-6 pt-5 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="service-item d-flex h-100">
                                <div className="service-img">
                                    <img className="img-fluid" src="img/service-1.jpg" alt="" />
                                </div>
                                <div className="service-text p-5 pt-0">
                                    <div className="service-icon">
                                        <img className="img-fluid rounded-circle" src="img/service-1.jpg" alt="" />
                                    </div>
                                    <h5 className="mb-3">Best Animal Selection</h5>
                                    <p className="mb-4">We have healthy livestock in our farm and we are upto industrials standards in every aspects.</p>
                                    <a className="btn btn-square rounded-circle" href="/contact"><i className="bi bi-chevron-double-right"></i></a>
                                </div>
                            </div>
                        </div>
                        {/* Service Item 2 */}
                        <div className="col-lg-4 col-md-6 pt-5 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="service-item d-flex h-100">
                                <div className="service-img">
                                    <img className="img-fluid" src="img/service-2.jpg" alt="" />
                                </div>
                                <div className="service-text p-5 pt-0">
                                    <div className="service-icon">
                                        <img className="img-fluid rounded-circle" src="img/service-2.jpg" alt="" />
                                    </div>
                                    <h5 className="mb-3">Breeding & Veterinary</h5>
                                    <p className="mb-4">We have Veterinarian taking care of livestock at any given time.</p>
                                    <a className="btn btn-square rounded-circle" href="/contact"><i className="bi bi-chevron-double-right"></i></a>
                                </div>
                            </div>
                        </div>
                        {/* Service Item 3 */}
                        <div className="col-lg-4 col-md-6 pt-5 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="service-item d-flex h-100">
                                <div className="service-img">
                                    <img className="img-fluid" src="img/service-3.jpg" alt="" />
                                </div>
                                <div className="service-text p-5 pt-0">
                                    <div className="service-icon">
                                        <img className="img-fluid rounded-circle" src="img/service-3.jpg" alt="" />
                                    </div>
                                    <h5 className="mb-3">Care & Milking</h5>
                                    <p className="mb-4">We take care of our customers by giving them high quality milk.</p>
                                    <a className="btn btn-square rounded-circle" href="/contact"><i className="bi bi-chevron-double-right"></i></a>
                                </div>
                            </div>
                        </div>
                        {/* Service Item 3 */}
                        <div className="col-lg-4 col-md-6 pt-5 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="service-item d-flex h-100">
                                <div className="service-img">
                                    <img className="img-fluid" src="img/service-3.jpg" alt="" />
                                </div>
                                <div className="service-text p-5 pt-0">
                                    <div className="service-icon">
                                        <img className="img-fluid rounded-circle" src="img/service-3.jpg" alt="" />
                                    </div>
                                    <h5 className="mb-3">Milk & Meat Supply on Events</h5>
                                    <p className="mb-4">We take care of our customers by providing them high quality supply.</p>
                                    <a className="btn btn-square rounded-circle" href="/contact"><i className="bi bi-chevron-double-right"></i></a>
                                </div>
                            </div>
                        </div>
                        {/* End of Service items */}
                    </div>
                </div>
            </div>
            {/* Service End */}

            <div>
      <Footer />
      </div>
        </>
    );
};

export default Services;
