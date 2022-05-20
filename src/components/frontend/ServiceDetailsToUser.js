import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import Navbar from "../../layout/frontend/navbar";

function serviceDetailsToUser(props)
{

    const [feedbackInput, setFeedback] = useState({
        userauthEmail: '',
        userName: '',
        serviceauthEmail: '',
        serviceName: '',
        feedback: '',
    });

    const [errorList, setError] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setFeedback({...feedbackInput, [e.target.name]:e.target.value});
    }

    const submitFeedback = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('userauthEmail', feedbackInput.userauthEmail);
        formData.append('userName', feedbackInput.userName);
        formData.append('serviceauthEmail', feedbackInput.serviceauthEmail);
        formData.append('serviceName', feedbackInput.serviceName);
        formData.append('feedback', feedbackInput.feedback);
        
        axios.post('/api/store-feedback', formData).then(res=> {
            if(res.data.status === 200) 
            {
                swal("Success",res.data.message,"success");
                setError([]);
            }
            else if(res.data.status === 422)
            {
                swal("All Fields Are Mandatory", "", "error");
                setError(res.data.errors);
            }
        });
    }

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [service, setService] = useState([]);

    const serviceCount = service.length;

        // 
        const email = localStorage.getItem('auth_email');
        const authName = localStorage.getItem('auth_name');
        
        feedbackInput.userauthEmail = email;
        feedbackInput.userName = authName;
        // 

    useEffect(() => {
        const serviceName = props.match.params.serviceName;
        axios.get(`/api/service-details/${serviceName}`).then(res=>{
            if(res.data.status === 200) 
            {
                // console.log(res.data.service_data.service)
                setService(res.data.service);
                setLoading(false);
            }
            else if(res.data.status == 404)
            {
                history.push('/collections');
                swal("warning",res.data.message, "error");
            }
        });
    }, [props.match.params.serviceName, history]);

    
    if(loading)
    {
        return <h4>Loading Service Details...</h4>
    }
    else
    {
        var viewService = '';
        var serviceName;
        if(serviceCount)
        {
            viewService = service.map( (item, idx) => {
                serviceName = item.serviceName;
                feedbackInput.serviceauthEmail = item.authEmail;
                feedbackInput.serviceName = item.serviceName;
                if(item.discount == 'undefined') 
                {
                return(
                    <div className="py-3">
                    <div className="container">
                        <div className="row">

                            <div className="col-md-5 border-end"> 
                                <img src={`http://localhost:8000/${item.image}`} height={500} className="w-100 h-300" alt={item.name}></img>
                            </div>

                            <div className="col-md-7">
                                <h4><b>{item.serviceName}</b></h4>
                                <span className="float-end badge bt-sm btn-danger badge-pil">{item.serviceName}</span>
                                <p className="mt-1">{item.description}</p>
                                <h5 className="mt-5"><b>{item.location}</b></h5>
                                <h4 className="mb-1 mt-5">Rs: 
                                    {item.sellingPrice}
                                    <s className="ms-3 mt-3">Rs: {item.originalPrice}</s>
                                </h4>
                                <h4 className="mt-5">0%</h4> <hr></hr>
                                
                                <div className="row bg-secondary py-3 ">
                                   <div className="col-md-2"></div>
                                   <div className="col-md-4">
                                   <Link to={`/communication/${item.id}`}>
                                    <button className="btn btn-outline-dark">Direct Communication</button>
                                    </Link>
                                   </div>
                                   <div className="col-md-4">
                                   <Link to={`/appoinment/${item.id}`}>
                                    <button className="btn btn-outline-dark">Make Appoinment</button>
                                    </Link>
                                   </div>
                               </div>

                            <form id="contactForm" onSubmit={submitFeedback}>
                                <div className="mt-3 row align-items-stretch mb-5">
                                    <div className="col-md-12">
                                        <div className="form-group form-group-textarea mb-md-0">

                                        <div className="row">
                                            <div className="col-md-3">
                                                <input type="hidden" name="userauthEmail" onChange={handleInput} value={feedbackInput.userauthEmail} className="form-control" />
                                            </div>
                                            <div className="col-md-3">
                                                <input type="hidden" name="userName" onChange={handleInput} value={feedbackInput.userName} className="form-control" />
                                            </div>
                                            <div className="col-md-3">
                                            <input type="hidden" name="serviceauthEmail" onChange={handleInput} value={feedbackInput.serviceauthEmail} className="form-control" />
                                            </div> 
                                            <div className="col-md-3">
                                            <input type="hidden" name="serviceName" onChange={handleInput} value={feedbackInput.serviceName} className="form-control" />
                                            </div> 
                                        </div>                                       
                                            <textarea className="form-control" name="feedback" onChange={handleInput} value={feedbackInput.feedback} placeholder="Enter Your Feedback *"></textarea>
                                            <small className="text-danger">{errorList.feedback}</small>

                                        </div>
                                    </div>
                                </div>
                                <div className="text-center"><button className="btn btn-primary btn-xl text-uppercase" type="submit">Send Feedback</button></div>

                            </form>

                            </div>

                        </div>

                    </div>
                    </div>
                )
            }
            else{
                return(

                    <div className="py-3">
                    <div className="container">
                        <div className="row">

                            <div className="col-md-5 border-end"> 
                                <img src={`http://localhost:8000/${item.image}`} height={500} className="w-100 h-300" alt={item.name}></img>
                            </div>

                            <div className="col-md-7">
                                <h4><b>{item.serviceName}</b></h4>
                                <span className="float-end badge bt-sm btn-danger badge-pil">{item.serviceName}</span>
                                <p className="mt-1">{item.description}</p>
                                <h5 className="mt-5"><b>{item.location}</b></h5>
                                <h4 className="mb-1 mt-5">Rs: 
                                    {item.sellingPrice}
                                    <s className="ms-3 mt-3">Rs: {item.originalPrice}</s>
                                </h4>
                                <h4 className="mt-5">{item.discount}%</h4><hr></hr>

                               <div className="row bg-secondary py-3 ">
                                   <div className="col-md-2"></div>
                                   <div className="col-md-4">
                                   <Link to={`/communication/${item.id}`}>
                                    <button className="btn btn-outline-dark">Direct Communication</button>
                                    </Link>
                                   </div>
                                   <div className="col-md-4">
                                   <Link to={`/appoinment/${item.id}`}>
                                    <button className="btn btn-outline-dark">Make Appoinment</button>
                                    </Link>
                                   </div>
                               </div>

                            <form id="contactForm" onSubmit={submitFeedback}>
                                <div className="mt-3 row align-items-stretch mb-5">
                                    <div className="col-md-12">
                                        <div className="form-group form-group-textarea mb-md-0">

                                        <div className="row">
                                            <div className="col-md-3">
                                                <input type="hidden" name="userauthEmail" onChange={handleInput} value={feedbackInput.userauthEmail} className="form-control" />
                                            </div>
                                            <div className="col-md-3">
                                                <input type="hidden" name="userName" onChange={handleInput} value={feedbackInput.userName} className="form-control" />
                                            </div>
                                            <div className="col-md-3">
                                            <input type="hidden" name="serviceauthEmail" onChange={handleInput} value={feedbackInput.serviceauthEmail} className="form-control" />
                                            </div> 
                                            <div className="col-md-3">
                                            <input type="hidden" name="serviceName" onChange={handleInput} value={feedbackInput.serviceName} className="form-control" />
                                            </div> 
                                        </div>                                       
                                            <textarea className="form-control" name="feedback" onChange={handleInput} value={feedbackInput.feedback} placeholder="Enter Your Feedback *"></textarea>
                                            <small className="text-danger">{errorList.feedback}</small>

                                        </div>
                                    </div>
                                </div>
                                <div className="text-center"><button className="btn btn-primary btn-xl text-uppercase" type="submit">Send Feedback</button></div>

                            </form>

                            </div>

                        </div>

                    </div>
                    </div>
            )
        }
            }); 
       
        }
        else
        { 
            viewService =
            <div className="col-md-12">
                <h4>No Service Available {serviceName}... </h4>
            </div>
        }
        
    }

    const name = props.match.params.serviceName;

   return(
    <div>
    <div className="row p-5 mb-2 bg-dark text-white">
        <div className="col-md-12">
            <Navbar/>
        </div>
    </div>

    <div className="">
        <div className="container pt-2 pb-2">
            <div className="row">
                <h5><b>Category / {name}</b></h5>
            </div>
        </div>
    </div>

    <div className="py-3">
        <div className="container">
            <div className="row mt-2 ml-5 mr-5 mb-2">
                {viewService}
            </div>
        </div>
    </div>

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
        
</div>
   )
}

export default serviceDetailsToUser;