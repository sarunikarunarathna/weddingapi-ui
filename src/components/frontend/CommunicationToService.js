import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";

import '../../assets/frontend/css/styles.css';
import '../../assets/frontend/css/all.css';
import '../../assets/frontend/css/all2.css';
import { useHistory } from "react-router-dom";
import ServiceNavbar from "../../layout/frontend/ServiceNavbar";


function CommunicationToService(props)
{    
    const history = useHistory();

    const [communicationInput, setCommunicationList] = useState({
        reply: '',
    });

    const [errorList, setError] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setCommunicationList({...communicationInput, [e.target.name]:e.target.value});
    }

    const updateCommunication = (e) => {
        e.preventDefault();

        const comm_id = props.match.params.service_id;

        const formData = new FormData();
        formData.append('reply', communicationInput.reply);

        axios.post(`/api/update-communication/${comm_id}`, formData).then(res=> {
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
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message, "error");
                history.push('/messageList');
            }
        });
    }
// 
 
    // 
    const email = localStorage.getItem('auth_email');
    // 

        // get All Communication

        const [loading, setLoading] = useState(true);
        const [viewReplyList, setReplyList] = useState([]);
    
        useEffect(() => {
            const service_id = email;
            const comm_id = props.match.params.service_id;
            axios.get(`/api/view-reply/${service_id}/${comm_id}`).then(res=>{
                if(res.data.status === 200) 
                {
                    setReplyList(res.data.replyList);
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
            display_communication = viewReplyList.map( (item) => {
                if (item.reply === 'Not Reply Yet')
                {

                } else
                {
                    return (
                        <div>
                            <div className="form-group p-3">
                                <input className="form-control " disabled value={item.reply} id="name"  />
                            </div>                        
                        </div>
                    )
                }
                
            });

            display_reply = viewReplyList.map( (item) => {
                    return (
                        <div >
                            <div className="form-group p-3">
                                <input className="form-control " disabled value={item.message} id="name"  />
                            </div>
                        </div>
                    )
                          
        });

        }

        


    return (

        <div>

            <div className="row p-5 mb-2 bg-dark text-white">
                <div className="col-md-12">
                <ServiceNavbar />
                </div>
            </div>
          
          <section className="page-section" id="contact">
            <div className="container">
                <div className="py-0">
                    <h2 className="section-heading text-uppercase">Direct Communication</h2>
                </div>
         
                <form onSubmit={updateCommunication} id="contactForm" data-sb-form-api-token="API_TOKEN">

                        <div className="row">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Enter Your Text..." aria-label="List" 
                            name="reply" onChange={handleInput} value={communicationInput.reply}
                            aria-describedby="basic-addon2" />

                            <div className="input-group-append">
                                <button className="btn btn-outline-primary" type="submit">Send</button>
                            </div>
                        </div>
                        <small className="text-danger">{errorList.reply}</small>
                        
                        </div>
                 
                </form>
            </div>
            <div className="row align-items-stretch mb-5">
          <div className="row">
              <div className="col-md-1"></div>
              <div className="col-md-5 p-4">
              {display_communication}
              </div>
              <div className="col-md-5">
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

export default CommunicationToService;