import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import ServiceNavbar from "../../layout/frontend/ServiceNavbar";


function CommunicationServiceList()
{
    // 
    const email = localStorage.getItem('auth_email')
    // 

    // get total todolist
    const [loading, setLoading] = useState(true);
    const [viewCommunicationUserList, setCommunication] = useState([]);

    useEffect(() => {
        const service_id = email;
        axios.get(`/api/view-communicationUserList/${service_id}`).then(res=>{
            if(res.data.status === 200) 
            {
                setCommunication(res.data.communication);
                setLoading(false);
            }
        });
    }, []);

    var display_messagers = "";
    if(loading)
    {
        return <h4>View Message Loading</h4>
    }
    else
    {
     display_messagers = viewCommunicationUserList.map( (item) => {  
            
                return (
                    <div>
                        <table className="table table-striped">
                            <tbody>
                            <tr key={item.id}>
                                {/* <td>{item.id}</td> */}
                                <td className="col-md-2">{item.userName} </td>  
                                <td className="col-md-2">{item.serviceName}</td>
                                <td className="col-md-6">{item.message}</td>                          
                                <td className="col-md-2"><Link to={`reply/${item.id}`} className="btn btn-dark">Reply</Link></td>
                            </tr>
                            </tbody>
                        </table>
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

            <div className="row p-3 mb-2">
                <div className="col-md-12">
                    <h2><b>Message List</b></h2>
                </div>
            </div>

                <div className="row">
					<div className="col-10 col-md-8 mx-auto mt-4">

                    <div className="card-body">
                        <div className="table-responsive">
                            <div className="row">
                                <div className="col-md-2"><h6><b>User Name</b></h6></div>
                                <div className="col-md-2"><h6><b>Service Name</b></h6></div>
                                <div className="col-md-6"><h6><b>Message</b></h6></div>
                                <div className="col-md-2"></div>
                            </div>
                        {display_messagers}
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

export default CommunicationServiceList;