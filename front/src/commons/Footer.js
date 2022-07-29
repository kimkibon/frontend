import React from 'react';
import logoImage from './images/logo/GareBnBlog.png';
//import './style.css'
const Footer = () => {
  return (
    <div>

    {/* <!-- Footer --> */}
    <footer className='footer'>
        <div className="container">
            <div className="row align-items-center newsletter-area">
                <div className="col-lg-5">
                    <div className="newsletter-area-text">
                        <h4 className="text-white">Subscribe to get notification.</h4>
                        <p>
                            개어비앤비
                        </p>
                    </div>
                </div>
                <div className="col-lg-6 offset-lg-1">
                    <div className="newsletter-area-button">
                        <form action="#">
                            <div className="form">
                                <input type="email" name="email" id="mail" placeholder="Enter your email address"
                                    className="form-control"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="row main-footer">
                <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                    <div className="main-footer-info">
                        <img src={logoImage} alt="Logo" className="img-fluid"/>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et fringilla risus, vel.
                        </p>
                    </div>
                </div>
                <div className="col-lg-2 offset-lg-2 col-md-4 col-sm-6 col-12">
                    <div className="main-footer-quicklinks">
                        <h6>Company</h6>
                        <ul className="quicklink">
                            <li><a href="#!">About</a></li>
                            <li><a href="#!">Help &amp; Support</a></li>
                            <li><a href="#!">Privacy Policy</a></li>
                            <li><a href="#!">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-2 col-md-4 col-sm-6 col-12">
                    <div className="main-footer-quicklinks">
                        <h6>Quick links</h6>
                        <ul className="quicklink">
                            <li><a href="#!">New Realease</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-2 col-md-4 col-sm-6 col-12">
                    <div className="main-footer-quicklinks">
                        <h6>Account</h6>
                        <ul className="quicklink">
                            <li><a href="#!">Profile</a></li>
                            <li><a href="#!">Order Completed</a></li>
                            <li><a href="#!">Log-out</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="copyright d-flex justify-content-between align-items-center">
                        <div className="copyright-text order-2 order-lg-1">
                            <p>&copy; 2020. Design and Developed</p>
                        </div>
                        <div className="copyright-links order-1 order-lg-2">
                            <a href="#!" className="ml-0"><i className="fab fa-facebook-f"></i></a>
                            <a href="#!"><i className="fab fa-twitter"></i></a>
                            <a href="#!"><i className="fab fa-youtube"></i></a>
                            <a href="#!"><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    {/* <!-- Footer --> */}
    </div>


  )
}

export default Footer