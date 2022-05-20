import axios from "axios";
import React from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import swal from "sweetalert";

function ServiceNavbar() {

    const history = useHistory();
    const logoutSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/logout').then(res => {
            if(res.data.status === 200)
            {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                localStorage.removeItem('auth_email');
                swal("Success", res.data.message, "success");
                history.push('/');
            }
        });
    }

    return (
                        
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
        <div className="container">
                        <Link className="navbar-brand" to="#">WEDDING PLANNING</Link>
            {/* <Link className="navbar-brand" to="#page-top"><img src="assets/img/navbar-logo.svg" /></Link> */}
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                Menu
                <i className="fas fa-bars ms-1"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/serviceHome">HOME</Link>
                    </li>
                    <li className="nav-item"><Link className="nav-link" to="/offerList">OFFERS</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/addService">Add Service</Link></li>             
                    <li className="nav-item"><Link className="nav-link" to="/viewService">Manage Service</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/collections">Collections</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/appoinment">Appoinment</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/messageList">Communication</Link></li>
                    <li className="nav-item"><button type="button" onClick={logoutSubmit} className="ml-2 nav-link btn btn-outline-primary"><i className="fa fa-user" /> Logout</button></li>
                </ul>
            </div>
        </div>
        </nav>

    );
}
export default ServiceNavbar;