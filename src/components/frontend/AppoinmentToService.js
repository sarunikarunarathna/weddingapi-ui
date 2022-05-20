import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ServiceNavbar from "../../layout/frontend/ServiceNavbar";


function AppoinmentToService(props)
{  

// 
        const email = localStorage.getItem('auth_email');
        // 

    // get all appoinment

    const [loading, setLoading] = useState(true);
    const [viewAppoinment, setAppoinmentList] = useState([]);


    useEffect(() => {
        const service_id = email;
        axios.get(`/api/view-appoinment-to-service/${service_id}`).then(res=>{
            if(res.data.status === 200) 
            {
                setAppoinmentList(res.data.appoinment);
                setLoading(false);
            }
        });
    }, []);

    var display_Appoinment = "";
    if(loading)
    {
        return <h4>View Appoinment Loading</h4>
    }
    else
    {
        // wen i add the list it will automatically refresh -> please do it
        display_Appoinment = viewAppoinment.map( (item) => {
            return (
                <div>
                    <table className="table table-striped">
                        <tbody>
                        <tr key={item.id}>
                            <td className="col-md-6"><b> {item.userName} , {item.serviceName} : </b>{item.appoinment}</td>
                            <td className="col-md-2 ">{item.response}</td>
                            <td className="col-md-2"><Link to={`edit-appoinment/${item.id}`} className="btn btn-success">View to Accept</Link></td>
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
                    <h2><b>View Appoinment</b></h2>
                </div>
            </div>

            <div className="container">
				<div className="row">
					<div className="col-10 col-md-8 mx-auto mt-4">

                        <div className="card-body">
                        <div className="table-responsive">
                        {display_Appoinment}
                        </div>
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

export default AppoinmentToService;