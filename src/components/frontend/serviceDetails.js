import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import ServiceNavbar from "../../layout/frontend/ServiceNavbar";

function serviceDetails(props)
{

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [service, setService] = useState([]);
    const [feedback, setFeedback] = useState([]);

    const serviceCount = service.length;

        // 

        const serviceauthEmail = localStorage.getItem('auth_email');
        // 

    useEffect(() => {
        const serviceName = props.match.params.serviceName;
        axios.get(`/api/feedback-details/${serviceName}/${serviceauthEmail}`).then(res=>{
            if(res.data.status === 200) 
            {
                setFeedback(res.data.feedback);
            }
        });
    }, [props.match.params.serviceName, history]);

    var viewFeedback = '';

    viewFeedback = feedback.map( (item, idx) => {
        serviceName = item.serviceName;
        return(
                <div className="py-1">
                    <div className="row">
                    <h5 className=""><b>{item.userName} : </b> {item.feedback} </h5>
                    </div>
                </div>
        )
    }); 

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
                                    <h4 className="mt-5">0%</h4>
                                </div>

                            </div>
                        </div>
                        <div className="row py-2">
                            <div className="col-md-6">
                            <div>
                                <h4 className="text-center py-2"><b>Feedback List</b></h4>
                                <p>
                                    <p>{viewFeedback}</p>
                                </p>
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
                                    <h4 className="mt-5">{item.discount}%</h4>
                                </div>

                            </div>
                        </div>

                        <div className="row py-2">
                            <div className="col-md-6">
                            <div>
                                <h4 className="text-center py-2"><b>Feedback List</b></h4>
                                <p>
                                    <p>{viewFeedback}</p>
                                </p>
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
            <ServiceNavbar/>
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

export default serviceDetails;