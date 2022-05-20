import React, { useEffect, useState } from "react";

import '../../assets/frontend/css/styles.css';
import '../../assets/frontend/css/all.css';
import '../../assets/frontend/css/all2.css';

import '../../assets/frontend/js/scripts.js';
import Navbar from "../../layout/frontend/navbar";

function Home() {

    return(
        <body id="page-top">

        <Navbar />
        <header className="masthead">
            <div className="container">
                <div className="masthead-subheading">Welcome!</div>
                <div className="masthead-heading text-uppercase">It's Nice To Meet You</div>
            </div>
        </header>

        <section className="page-section" id="services">
            <div className="container">
                <div className="text-center">
                    <h2 className="section-heading text-uppercase mb-3  ">Services</h2>
                    <p> </p>
                </div>
                <div className="row text-center">
                    <div className="col-md-4">
                        <span className="fa-stack fa-4x">
                            <i className="fas fa-circle fa-stack-2x text-primary"></i>
                            <i className="fas fa-sitemap fa-stack-1x fa-inverse"></i>
                        </span>
                        <h4 className="my-3">Find Service Providers</h4>
                        <p className="text-muted">According to special budget, location, and required category it would be able to find the service providers according to the customer's preferences.</p>
                    </div>
                    <div className="col-md-4">
                        <span className="fa-stack fa-4x">
                            <i className="fas fa-circle fa-stack-2x text-primary"></i>
                            <i className="fas fa-layer-group fa-stack-1x fa-inverse"></i>
                        </span>
                        <h4 className="my-3">Budget Plan</h4>
                        <p className="text-muted">According to the requirements of the cutomer it would be easily plan the estimate of budget.</p>
                    </div>
                    <div className="col-md-4">
                        <span className="fa-stack fa-4x">
                            <i className="fas fa-circle fa-stack-2x text-primary"></i>
                            <i className="fas fa-server fa-stack-1x fa-inverse"></i>
                        </span>
                        <h4 className="my-3">To-Do List</h4>
                        <p className="text-muted">Customers would be able to create a to-do list as a reminderto make their tasks effectively.</p>
                    </div>
                </div>

                <div className="row text-center">
                    <div className="col-md-2"></div>
                    <div className="col-md-4">
                        <span className="fa-stack fa-4x">
                            <i className="fas fa-circle fa-stack-2x text-primary"></i>
                            <i className="fas fa-address-card fa-stack-1x fa-inverse"></i>
                        </span>
                        <h4 className="my-3">Appoinment</h4>
                        <p className="text-muted">Customer would be able to make appoinments through the System and Service provider can accept their appoinment through the system.</p>
                    </div>
                    <div className="col-md-4">
                        <span className="fa-stack fa-4x">
                            <i className="fas fa-circle fa-stack-2x text-primary"></i>
                            <i className="fas fa-comments fa-stack-1x fa-inverse"></i>
                        </span>
                        <h4 className="my-3">Communication</h4>
                        <p className="text-muted">The customer can communicate directly with the service provider through the system.</p>
                    </div>
                </div>

            </div>
        </section>
   
        <footer className="footer py-4">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-4 text-lg-start">Copyright &copy; Wedding Planning 2022</div>
                    <div className="col-lg-4 my-3 my-lg-0">
                        <a className="btn btn-dark btn-social mx-2" to="#!" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                        <a className="btn btn-dark btn-social mx-2" to="#!" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                        <a className="btn btn-dark btn-social mx-2" to="#!" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    <div className="col-lg-4 text-lg-end">
                        <a className="link-dark text-decoration-none me-3" to="#!">Privacy Policy</a>
                        <a className="link-dark text-decoration-none" to="#!">Terms of Use</a>
                    </div>
                </div>
            </div>
        </footer>
        

   
    

    </body>
    )
}
export default Home;