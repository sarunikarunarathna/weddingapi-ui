import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import swal from "sweetalert";

function Navbar() {

    // 

    const email = localStorage.getItem('auth_email');

    const [viewtobeComplete, settobecompletlist] = useState([]);

    const tobecompleteList = viewtobeComplete.length;

    useEffect(() => {
        const user_id = email;
        axios.get(`/api/view-tobecomplete/${user_id}`).then(res=>{
            if(res.data.status === 200) 
            {
                settobecompletlist(res.data.tobecomplete);
            }
        });
    }, []);

    // 

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

    var AuthButtons = '';
    if (!localStorage.getItem('auth_token')) {
        AuthButtons = (
            <ul className="nav-item">
                <li className="nav-item">
                    <Link className="nav-link" to="/login">LOGIN</Link>
                </li>
            </ul>
        );
    }
    else {
        AuthButtons = (
            <ul className="navbar-nav mx-auto">
                 <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/userHome">HOME</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/offerListToUser">OFFERS</Link>
                </li>            
                <li className="nav-item">
                    <Link className="nav-link" to="/budgetPlanning">PLANNING TOOL</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/viewAppoinment">Appoinment</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/todolist">To-Do List
                    <span className="fa-stack fa-1x">
                        <p> <b> ( {tobecompleteList} ) </b></p>
                    </span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/collectionsToUser">SUPPLIERS</Link>
                </li>
                <li className="nav-item">
                    <button type="button" onClick={logoutSubmit} className="ml-2 nav-link btn btn-outline-primary"><i className="fa fa-user" /> Logout</button>
                </li>
            
            </ul>
        );
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
                <Link className="nav-link active" aria-current="page" to="/"></Link>
            </li>
            {AuthButtons}
        </ul>
    </div>
</div>
</nav>

    );
}
export default Navbar;