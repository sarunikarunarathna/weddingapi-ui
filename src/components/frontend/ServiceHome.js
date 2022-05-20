import React, { useEffect, useState } from "react";

import '../../assets/frontend/css/styles.css';
import '../../assets/frontend/css/all.css';
import '../../assets/frontend/css/all2.css';
import ServiceNavbar from "../../layout/frontend/ServiceNavbar";

import '../../assets/frontend/js/scripts.js';

import { Link } from "react-router-dom";

import axios from "axios";

function ServiceHome() {


    const [serviceInput, setSelectedService] = useState({
        service_id: '',
    });

    const handleInput = (e) => {
        e.persist();
        setSelectedService({...serviceInput, [e.target.name]:e.target.value});
    }

    const [service, setService] = useState([]);

    useEffect(() => {
      
        axios.get('/api/get-service').then(res=>{
            if(res.data.status === 200) 
            {
                setService(res.data.service);
            }
        });
    }, []);

    // 

    const [searchservice, setSearchService] = useState([]);

    const searchService = (e, service_id) => {
        axios.get(`/api/search-service/${service_id}`).then(res=>{
            if(res.data.status === 200) 
            {
                setSearchService(res.data.service);
            }
        });
    }

    var showSearchList = '';
    showSearchList = searchservice.map( (item, idx) => {
        return (
            <section>
            <div className="container">
            <div className="text-center">
                    <h2 className="section-heading text-uppercase">Top Wedding Vendor Services</h2>
                </div>
                <div className="row">
                        <div className="row mt-2 mb-2">
            <div className="col-md-4" key={idx}>
                <div className="card">
                    <div className="row">
                    <div className="card">
                            <Link to={`/category/${item.serviceName}`}>
                            <img src={`http://localhost:8000/${item.image}`} className="w-100" alt={item.name}></img>
                            </Link>
                            <div className="card-body">
                                <h5 className="text-center">{item.serviceName}</h5> 
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            </div>
                </div>
            </div>
        </section>
        )
    });

    // 

    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState([]);

    useEffect(() => {
      
        axios.get('/api/get-category').then(res=>{
            if(res.data.status === 200) 
            {
                // console.log(res.data.category)
                setCategory(res.data.category);
                setLoading(false);
            }
        });
    }, []);

    if(loading)
    {
        return <h4>Loading categories...</h4>
    }
    else
    {
        var showCatList = '';
        showCatList = category.map( (item, idx) => {
            return (
                <div className="col-md-4" key={idx}>
                    <div className="card">
                        <div className="row">
                            <div className="card">
                                <Link to={`collectionToUser/${item.name}`}>
                                    <img src={`http://localhost:8000/${item.image}`} className="w-100" alt={item.name}></img>
                                </Link>
                                <div className="card-body">
                                    <h5 className="text-center">{item.name}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        });
    }

    // 


    return(
        <body id="page-top">

        <ServiceNavbar />
        <header className="masthead">
            <div className="container">
                <div className="masthead-subheading">Welcome!</div>
                <div className="masthead-heading text-uppercase">It's Nice To Meet You</div>
            </div>
        </header>


        <div className="row bg-secondary py-4">
            <div className="col-md-2"></div>
        <div className="col-md-4">
                           <div className="input-group ">
                           <select name="service_id" onChange={handleInput} value={serviceInput.service_id} className="form-control">

                                <option>Search By Service</option>
                                    {
                                        service.map((item) => (
                                            <option value={item.id} key={item.id} >{item.serviceName}</option>
                                        ))
                                    }
                                </select>

                                <div className="input-group-append">
                                    <button className="btn btn-outline-dark" type="button" onClick={ (e) => searchService(e, serviceInput.service_id)}><i className="fas fa-search"></i></button>
                                </div>
                            </div>
                    </div>

                    <div className="col-md-4">
                           <div className="input-group ">
                           <select name="service_id" onChange={handleInput} value={serviceInput.service_id} className="form-control">

                                <option>Search By Location</option>
                                    {
                                        service.map((item) => (
                                            <option value={item.id} key={item.id} >{item.location}</option>
                                        ))
                                    }
                                </select>

                                <div className="input-group-append">
                                    <button className="btn btn-outline-dark" type="button" onClick={ (e) => searchService(e, serviceInput.service_id)}><i className="fas fa-search"></i></button>
                                </div>
                            </div>
                    </div>
        </div>

    
                            {showSearchList}
     
                            <section>
            <div className="container">
                <div className="text-center">
                    <h2 className="section-heading text-uppercase">Top Wedding Vendor Categories</h2>
                </div>
                <div className="row">
                        <div className="row mt-2 mb-2">
                            {showCatList}
                        </div>
                </div>
            </div>
        </section>

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
export default ServiceHome;