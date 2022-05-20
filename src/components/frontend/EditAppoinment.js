import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import ServiceNavbar from "../../layout/frontend/ServiceNavbar";


function EditAppoinment(props)
{    
    const history = useHistory();

        // store
        const [appoinmentInput, setAppoinment] = useState({
            response: '',
        });
    
        const [errorList, setError] = useState([]);
    
        const handleInput = (e) => {
            e.persist();
            setAppoinment({...appoinmentInput, [e.target.name]:e.target.value});
        }
    
        const updateAppoinment = (e) => {
            e.preventDefault();

            const appoinment_id = props.match.params.id;
     
            const formData = new FormData();
            formData.append('response', appoinmentInput.response);
    
            axios.post(`/api/update-appoinment/${appoinment_id}`, formData).then(res=> {
                if(res.data.status === 200) 
                {
                    swal("Success",res.data.message,"success");
                    history.push('/appoinment');
                    setError([]);
                }
                else if(res.data.status === 422)
                {
                    swal("All Fields Are Mandatory", "", "error");
                    setError(res.data.errors);
                }
                else if(res.data.status === 404)
                {
                    swal("Error",res.data.message, "error");
                    history.push('/appoinment');
                }
            });
        }


    return (

        <div>
            <div className="row p-5 mb-2 bg-dark text-white">
                <div className="col-md-12">
                <ServiceNavbar />
                </div>
            </div>

            <div className="row p-3 mb-2">
                <div className="col-md-12">
                    <h2><b>Make Appoinment</b></h2>
                </div>
            </div>

            <div className="container">
				<div className="row">
					<div className="col-10 col-md-8 mx-auto mt-4">
						
                        <form onSubmit={updateAppoinment}>

                        {/* <div className="row">
                        <div className="col-md-3">
                                <input type="text" name="userEmail" onChange={handleInput} value={appoinmentInput.userEmail} className="form-control" />
                            </div>
                            <div className="col-md-3">
                                <input type="text" name="userName" onChange={handleInput} value={appoinmentInput.userName} className="form-control" />
                            </div>
                            <div className="col-md-3">
                                <input type="text" name="serviceEmail" onChange={handleInput} value={appoinmentInput.serviceEmail} className="form-control" />
                            </div>
                            <div className="col-md-2">
                                <input type="text" name="serviceName" onChange={handleInput} value={appoinmentInput.serviceName} className="form-control" />
                            </div>
                            <div className="col-md-1">
                                <input type="text" name="service_id" onChange={handleInput} value={appoinmentInput.service_id} className="form-control" />
                            </div>
                        </div>
                        <div className="row">
                        <input type="text" className="form-control" name="appoinment" onChange={handleInput} value={appoinmentInput.appoinment}/>
                        </div> */}

                            <div className="row">
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Enter Accepted" name="response" onChange={handleInput} value={appoinmentInput.response}/>
                                
                            <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" type="submit"><i className="fas fa-plus"></i></button>
                                </div>
                            </div>
                            <small className="text-danger">{errorList.response}</small>
                            
                            </div>
                        </form>

                        <div className="card-body">
                    </div>

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

export default EditAppoinment;