import React from 'react';
import logoImage from './images/logo/GareBnBlog.png';
//import './style.css'
const Footer = () => {
    return (
        <div>

            {/* <!-- Footer --> */}
            <footer className='footer'>
                <div className="container">
                    {/* <div className="row align-items-center newsletter-area">
                <div className="col-lg-5">
                    <div className="newsletter-area-text">
                        <h4 className="text-black">Subscribe to get notification.</h4>
                        <p>
                            개어비앤비
                        </p>
                    </div>
                </div>
            </div>      */}

                    {/* <div className="col-lg-6 offset-lg-1">
                    <div className="newsletter-area-button">
                        <form action="#">
                            <div className="form">
                                <input type="email" name="email" id="mail" placeholder="Enter your email address"
                                    className="form-control"/>
                            </div>
                        </form>
                    </div>
                </div> */}



                    <div className="row main-footer">
                        <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                            <div className="main-footer-info">
                                <img src={logoImage} alt="Logo" className="img-fluid" />
                                <p>
                                    2022. Design and Developed

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

                    <br/>
                    <div className="row ">
                        <div className="col-md-12">
                            <div className="copyright d-flex justify-content-start align-items-center">
                                <div className="copyright-text order-1 order-lg-1">
                                    <p style={{ fontSize: "12px" }}> All material herein &copy; GareBnB Company Pte. Ltd., All Rights Reserved.
                                        | 웹사이트 제공자 : 강호연, 구승회, 김아람, 김진, 이승아 | 연락처 : admin@garebnb.com <br />
                                        개어비앤비는 통신판매 중개자로 개어비앤비 플랫폼을 통하여 보호자와 호스트 사이에 이루어지는 통신판매의 당사자가 아닙니다.
                                        개어비앤비 플랫폼을 통하여 예약된 게시글, 호스트 서비스에 관한 의무와 책임은 해당 서비스를 제공하는 호스트에게 있습니다.</p>
                                </div>

                                {/* <div className="copyright-links order-1 order-lg-2">
                            <a href="#!" className="ml-0"><i className="fab fa-facebook-f"></i></a>
                            <a href="#!"><i className="fab fa-twitter"></i></a>
                            <a href="#!"><i className="fab fa-youtube"></i></a>
                            <a href="#!"><i className="fab fa-instagram"></i></a>
                        </div> */}
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