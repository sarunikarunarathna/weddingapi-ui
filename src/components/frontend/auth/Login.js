import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Navbar from "../../../layout/frontend/navbar";

function Login () {

    const history = useHistory();

    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setLogin({...loginInput, [e.target.name]: e.target.value});
    }

    const loginSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: loginInput.email,
            password: loginInput.password,
        }
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('api/login', data).then(res => {
                if (res.data.status === 200)
                {
                    if(res.data.role_as === 'Service') 
                    {
                        // console.log(res)
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    localStorage.setItem('auth_email', res.data.email);
                    swal("Success", res.data.message, "success");
                    history.push('/serviceHome');
                    }
                    else if (res.data.role_as === 'User') 
                    {
                        // console.log(res)
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    localStorage.setItem('auth_email', res.data.email);
                    swal("Success", res.data.message, "success");
                    history.push('/userHome');
                    }
                    else if (res.data.role_as === 'Admin')
                    {
                        localStorage.setItem('auth_token', res.data.token);
                        localStorage.setItem('auth_name', res.data.username);
                        localStorage.setItem('auth_email', res.data.email);
                        swal("Success", res.data.message, "success");
                        history.push('/admin');
                    }
                }
                else if (res.data.status === 401)
                {
                    swal("Warning", res.data.message, "warning");
                }
                else
                {
                    setLogin({...loginInput, error_list: res.data.validation_errors});
                }
            });
        });
    }

    return(
        <div>
            <Navbar />
            <header className="masthead">
            <div className="container">
                <div className="masthead-subheading">
         
                <div className="row justify-content-center">
                    <div className="col-md-6">
                    <div className="masthead-heading text-uppercase">Login</div>
                        
                                <form onSubmit={loginSubmit}>
                                    <div className="form-group mb-3">
                                        <div className="masthead-subheading">E-Mail</div>
                                        <input type="email" name="email" onChange={handleInput} value={loginInput.email}  className="form-control"/>
                                        <span>{loginInput.error_list.email}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                    <div className="masthead-subheading">Password</div>
                                        <input type="password" name="password" onChange={handleInput} value={loginInput.password}  className="form-control"/>
                                        <span>{loginInput.error_list.password}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button className="btn btn-primary btn-xl text-uppercase" type="submit"> Login </button>
                                    </div>
                                </form>
                                <div className="row">
                                    <div className="col-md-6 lead">
                                        <button className="btn btn-dark"><Link to="/register">Click here to register..</Link></button>
                                    </div>
                                </div>

                    </div>
                </div>
     
                </div>
            </div>
        </header>
        
        </div>
    );
}
export default Login;