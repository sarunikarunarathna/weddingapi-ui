import React, { useEffect, useState } from "react";

import '../../assets/frontend/css/styles.css';
import '../../assets/frontend/css/all.css';
import '../../assets/frontend/css/all2.css';

import '../../assets/frontend/js/scripts.js';

import { Link } from "react-router-dom";

import axios from "axios";
import Navbar from "../../layout/frontend/navbar";

function UserHome() {

    const [ItemInput, setSelectedItem] = useState({
        item_Id: '',
    });

    const handleItemInput = (e) => {
        e.persist();
        setSelectedItem({...ItemInput, [e.target.name]:e.target.value});
    }

    const [item, setItem] = useState([]);

        // 
        const user_mail = localStorage.getItem('auth_email');
        // 

    useEffect(() => {
      
        axios.get(`/api/get-item/${user_mail}`).then(res=>{
            if(res.data.status === 200) 
            {
                console.log(res.data.item)
                setItem(res.data.item);
            }
        });
    }, []);

    // 

        // 

        const [searchItem, setSearchItem] = useState([]);

        const searchItemToGet = (e, item_Id) => {
            axios.get(`/api/search-item/${item_Id}`).then(res=>{
                if(res.data.status === 200) 
                {
                    setSearchItem(res.data.item);
                }
            });
        }
    
        var showSearchItemList = '';
        showSearchItemList = searchItem.map( (item, idx) => {
            return (
                <div>
                <table className="table table-striped">
               
                    <tbody>
                    <tr>
                                <td className="col-md-3"><h6><b>Your Budget Item</b></h6></td>
                                <td className="col-md-3"><h6><b>Budget Cost</b></h6></td>
                                <td className="col-md-3"><h6><b>Actual Cost</b></h6></td>
                                <td className="col-md-2"><h6><b>Paid</b></h6></td>
                                <td className="col-md-2"></td>
                            </tr>
                    <tr key={item.id}>
                        {/* <td>{item.id}</td> */}
                        <td className="col-md-3">{item.service_id}</td>
                        <td className="col-md-3">{item.budgetCost}</td>
                        <td className="col-md-3">{item.actusalCost}</td>
                        <td className="col-md-2">{item.paidAmount}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            )
        });
    
        // 



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
            <div className="col-md-4" key={idx}>
                <div className="card">
                    <div className="row">
                        <div className="card">
                             <Link to={`/categoryToUser/${item.serviceName}`}>
                                <img src={`http://localhost:8000/${item.image}`} className="w-100" alt={item.name}></img>
                             </Link>
                            <div className="card-body">
                                <h5 className="text-center">{item.serviceName}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    });

    // 

       // 

       const [searchLocationList, setSearchServiceLocation] = useState([]);

       const searchLocation = (e, location_id) => {
           axios.get(`/api/search-location/${location_id}`).then(res=>{
               if(res.data.status === 200) 
               {
                   console.log(res.data.service)
                setSearchServiceLocation(res.data.service);
               }
           });
       }
   
       var showSearchLocationList = '';
       showSearchLocationList = searchLocationList.map( (item, idx) => {
           return (
               <div className="col-md-4" key={idx}>
                   <div className="card">
                       <div className="row">
                           <div className="card">
                                <Link to={`/categoryToUser/${item.serviceName}`}>
                                   <img src={`http://localhost:8000/${item.image}`} className="w-100" alt={item.name}></img>
                                </Link>
                               <div className="card-body">
                                   <h5 className="text-center">{item.serviceName} - {item.location}</h5>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
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

        <Navbar />
        <header className="masthead">
            <div className="container">
                        <div className="masthead-subheading">Welcome!</div>
                        <div className="masthead-heading text-uppercase">It's Nice To Meet You</div>
            </div>
        </header>

        <div className="row bg-secondary py-4">
            <div className="col-md-2"></div>
        <div className="col-md-3">
                           <div className="input-group ">
                           <select name="service_id" onChange={handleInput} value={serviceInput.service_id} className="form-control">

                                <option>Search By Service</option>
                                    {
                                        service.map((item) => (
                                            <option value={item.serviceName} key={item.id} >{item.serviceName}</option>
                                        ))
                                    }
                                </select>

                                <div className="input-group-append">
                                    <button className="btn btn-outline-dark" type="button" onClick={ (e) => searchService(e, serviceInput.service_id)}><i className="fas fa-search"></i></button>
                                </div>
                            </div>
                    </div>

                    <div className="col-md-3">
                           <div className="input-group ">
                           <select name="location_id" onChange={handleInput} value={serviceInput.location_id} className="form-control">

                                <option>Search By Location</option>
                                    {
                                        service.map((item) => (
                                            <option value={item.location} key={item.id} >{item.location}</option>
                                        ))
                                    }
                                </select>

                                <div className="input-group-append">
                                    <button className="btn btn-outline-dark" type="button" onClick={ (e) => searchLocation(e, serviceInput.location_id)}><i className="fas fa-search"></i></button>
                                </div>
                            </div>
                    </div>

                    <div className="col-md-3">
                           <div className="input-group ">
                           <select name="item_Id" onChange={handleItemInput} value={ItemInput.item_Id} className="form-control">

                                <option>Search Your Budget Item By Budjet Cost</option>
                                    {
                                        item.map((item) => (
                                            <option value={item.actusalCost} key={item.id} >{item.actusalCost}</option>
                                        ))
                                    }
                                </select>

                                <div className="input-group-append">
                                    <button className="btn btn-outline-dark" type="button" onClick={ (e) => searchItemToGet(e, ItemInput.item_Id)}><i className="fas fa-search"></i></button>
                                </div>
                            </div>
                    </div>
        </div>

        <section>
            <div className="container">
                <div className="row">
                            {showSearchList}
                            {showSearchLocationList}
					<div className=" col-md-12 mt-4">

                        <div className="card-body">
                        <div className="table-responsive">
                            
                            {showSearchItemList}

                        </div>
                    </div>

				</div>
                </div>
            </div>
        </section>    

        <section>
            <div className="container">
                <div className="text-center">
                    <h2 className="section-heading text-uppercase">Top Wedding Vendor Categories</h2>
                </div>
                <div className="row">
                        <div className="row">
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
export default UserHome;