import React from 'react';
import logoImage from './images/logo/GareBnBlog.png';
//import './style.css'
const Footer = () => {
  return (
    <div>

    {/* <!-- Footer --> */}
    <body>
    <footer class='footer'>
        <div class="container">
            <div class="row align-items-center newsletter-area">
                <div class="col-lg-5">
                    <div class="newsletter-area-text">
                        <h4 class="text-white">Subscribe to get notification.</h4>
                        <p>
                            개어비앤비
                        </p>
                    </div>
                </div>
                <div class="col-lg-6 offset-lg-1">
                    <div class="newsletter-area-button">
                        <form action="#">
                            <div class="form">
                                <input type="email" name="email" id="mail" placeholder="Enter your email address"
                                    class="form-control"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="row main-footer">
                <div class="col-lg-4 col-md-12 col-sm-12 col-12">
                    <div class="main-footer-info">
                        <img src={logoImage} alt="Logo" class="img-fluid"/>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et fringilla risus, vel.
                        </p>
                    </div>
                </div>
                <div class="col-lg-2 offset-lg-2 col-md-4 col-sm-6 col-12">
                    <div class="main-footer-quicklinks">
                        <h6>Company</h6>
                        <ul class="quicklink">
                            <li><a href="#!">About</a></li>
                            <li><a href="#!">Help &amp; Support</a></li>
                            <li><a href="#!">Privacy Policy</a></li>
                            <li><a href="#!">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-2 col-md-4 col-sm-6 col-12">
                    <div class="main-footer-quicklinks">
                        <h6>Quick links</h6>
                        <ul class="quicklink">
                            <li><a href="#!">New Realease</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-2 col-md-4 col-sm-6 col-12">
                    <div class="main-footer-quicklinks">
                        <h6>Account</h6>
                        <ul class="quicklink">
                            <li><a href="#!">Profile</a></li>
                            <li><a href="#!">Order Completed</a></li>
                            <li><a href="#!">Log-out</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="copyright d-flex justify-content-between align-items-center">
                        <div class="copyright-text order-2 order-lg-1">
                            <p>&copy; 2020. Design and Developed</p>
                        </div>
                        <div class="copyright-links order-1 order-lg-2">
                            <a href="#!" class="ml-0"><i class="fab fa-facebook-f"></i></a>
                            <a href="#!"><i class="fab fa-twitter"></i></a>
                            <a href="#!"><i class="fab fa-youtube"></i></a>
                            <a href="#!"><i class="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    {/* <!-- Footer --> */}
    </body>
    </div>


  )
}

export default Footer