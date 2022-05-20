import axios from "axios";
import React from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const Navbar = () => {

    const history = useHistory();
    const logoutSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/logout').then(res => {
            if(res.data.status === 200)
            {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_email');
                localStorage.removeItem('auth_name');
                swal("Success", res.data.message, "success");
                history.push('/');
            }
        });
    }

    return (
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
          
            <Link className="navbar-brand ps-3" to="/admin">Admin</Link>
          
        
                <button type="button" onClick={logoutSubmit} className="float-end ml-2 nav-link btn btn-outline-primary">LOGOUT</button>
        </nav>
    );
} 
export default Navbar;