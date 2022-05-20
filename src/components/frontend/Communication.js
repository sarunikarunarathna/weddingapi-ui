import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Navbar from "../../layout/frontend/navbar";

import '../../assets/frontend/css/styles.css';
import '../../assets/frontend/css/all.css';
import '../../assets/frontend/css/all2.css';


function Communication(props)
{    

          // store
          const [communicationInput, setCommunication] = useState({
            userEmail: '',
            userName: '',
            serviceEmail: '',
            serviceName: '',
            service_id: '',
            message: '',
        });

    const [errorList, setError] = useState([]);
    
    const handleInput = (e) => {
        e.persist();
        setCommunication({...communicationInput, [e.target.name]:e.target.value});
    }

    const submitCommunication = (e) => {
        e.preventDefault();
 
        const formData = new FormData();
        formData.append('userEmail', communicationInput.userEmail);
        formData.append('userName', communicationInput.userName);
        formData.append('serviceEmail', communicationInput.serviceEmail);
        formData.append('serviceName', communicationInput.serviceName);
        formData.append('service_id', communicationInput.service_id);
        formData.append('message', communicationInput.message);

        axios.post('/api/store-communication', formData).then(res=> {
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
// 

// 
const email = localStorage.getItem('auth_email');
const name = localStorage.getItem('auth_name');
communicationInput.userEmail = email;
communicationInput.userName = name;
// 

          // get service by id
          const [viewService, setService] = useState([]);

          const service_id = props.match.params.id;
      
          useEffect(() => {
              axios.get(`/api/details-service/${service_id}`).then(res=>{
                  if(res.data.status === 200) 
                  {
                      console.log(res.data.service)
                      setService(res.data.servise);
                  }
              });
          }, []);

          var displayService = "";

          displayService = viewService.map( (item) => {
            communicationInput.serviceName = item.serviceName;
            communicationInput.serviceEmail = item.authEmail;
            communicationInput.service_id = item.id;
          })

        //   

        // get All Communication

        const [loading, setLoading] = useState(true);
        const [viewCommunicationList, setCommunicationList] = useState([]);
    
        useEffect(() => {
            const user_id = email;
            axios.get(`/api/view-communication/${user_id}/${service_id}`).then(res=>{
                if(res.data.status === 200) 
                {
                    setCommunicationList(res.data.communicationList);
                    setLoading(false);
                }
            });
        }, []);

        var display_communication = "";
        var display_reply = "";
        if(loading)
        {
            return <h4>Message Loading</h4>
        }
        else
        {
            // wen i add the list it will automatically refresh -> please do it
            display_communication = viewCommunicationList.map( (item) => {
                    return (
                        <div>
                            <div className="form-group p-3">
                                <input className="form-control " disabled value={item.message} id="name"  />
                            </div>                        
                        </div>
                    )
                
            });

            display_reply = viewCommunicationList.map( (item) => {
                if (item.reply === 'Not Reply Yet') 
                {

                } else{
                    return (
                        <div >
                            <div className="form-group p-3">
                                <input className="form-control " disabled value={item.reply} id="name"  />
                            </div>
                        </div>
                    )
                }            
        });

        }

        // 


    return (

        <div>

            <div className="row p-5 mb-2 bg-dark text-white">
                <div className="col-md-12">
                <Navbar />
                </div>
            </div>
          
          <section className="page-section" id="contact">
            <div className="container">
                <div className="py-0">
                    <h2 className="section-heading text-uppercase">Direct Communication</h2>
                </div>
         
                <form onSubmit={submitCommunication} id="contactForm" data-sb-form-api-token="API_TOKEN">
                <div className="row">
                    <div className="col-md-3">
                            <input type="hidden" name="userEmail" onChange={handleInput} value={communicationInput.userEmail} className="form-control" />
                        </div>
                        <div className="col-md-3">
                            <input type="hidden" name="userName" onChange={handleInput} value={communicationInput.userName} className="form-control" />
                        </div>
                        <div className="col-md-3">
                            <input type="hidden" name="serviceEmail" onChange={handleInput} value={communicationInput.serviceEmail} className="form-control" />
                        </div>
                        <div className="col-md-2">
                            <input type="hidden" name="serviceName" onChange={handleInput} value={communicationInput.serviceName} className="form-control" />
                        </div>
                        <div className="col-md-1">
                            <input type="hidden" name="service_id" onChange={handleInput} value={communicationInput.service_id} className="form-control" />
                        </div>
                    </div>

                        <div className="row">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Enter Your Text..." aria-label="List" 
                            name="message" onChange={handleInput} value={communicationInput.message}
                            aria-describedby="basic-addon2" />

                            <div className="input-group-append">
                                <button className="btn btn-outline-primary" type="submit">Send</button>
                            </div>
                        </div>
                        <small className="text-danger">{errorList.message}</small>
                        
                        </div>
                 
                </form>
            </div>
            <div className="row align-items-stretch mb-5">
          <div className="row">
              <div className="col-md-1"></div>
              <div className="col-md-5">
              {display_communication}
              </div>
              <div className="col-md-5 p-4">
              {display_reply}
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
        </div>
    )
}

export default Communication;