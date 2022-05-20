import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Navbar from "../../../layout/frontend/navbar";

function Register() {

    const history = useHistory();
    const [registerInput, setRegister] = useState({
        name: '',
        role_as: '',
        email: '',
        password: '',
        usertype: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setRegister({...registerInput, [e.target.name]:e.target.value });
    }

    const registerSubmit = (e) => {
        e.preventDefault();
        const data = {
            role_as: registerInput.role_as,
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('api/register', data).then( res => {
                if(res.data.status === 200)
                {
                    // localStorage.setItem('auth_token', res.data.token);
                    // localStorage.setItem('auth_name', res.data.username);
                    swal("Success", res.data.message, "success");
                    history.push('/login');
                }
                else
                {
                    setRegister({ ...registerInput , error_list: res.data.validation_errors })
                }
            });
        });
    }

    return (
        <div>
            <Navbar />

            <header className="masthead">
            <div className="container">
                <div className="masthead-heading text-uppercase">REGISTER</div>
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                        <form onSubmit={registerSubmit}>

                                    <div className="form-group mb-3">
                                    <div className="masthead-subheading">Role As</div>
                                    <select name="role_as" onChange={handleInput} value={registerInput.role_as} className="form-control">
                                        <option>Select Your Role</option>
                                        <option>User</option>
                                        <option>Service</option>
                                        {/* <option>Admin</option> */}
                                    </select>
                                        <span>{registerInput.error_list.role_as}</span>
                                    </div>

                                    <div className="form-group mb-3">
                                    <div className="masthead-subheading">Name</div>
                                        <input type="" name="name" onChange={handleInput} value={registerInput.name} className="form-control" />
                                        <span>{registerInput.error_list.name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                    <div className="masthead-subheading">E-Mail</div>
                                        <input type="" name="email" onChange={handleInput} value={registerInput.email} className="form-control" />
                                        <span>{registerInput.error_list.email}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                    <div className="masthead-subheading">Password</div>
                                        <input type="" name="password" onChange={handleInput} value={registerInput.password} className="form-control" />
                                        <span>{registerInput.error_list.password}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button className="btn btn-primary btn-xl text-uppercase" type="submit"> Register</button>
                                    </div>
                                </form>

                                <div className="row">
                                    <div className="col-md-6 lead">
                                    <button className="btn btn-dark"><Link to="/login">Click here to login..</Link></button>    
                                    </div>
                                </div>
                        </div>
                    </div>
            </div>
        </header>

        </div>
    );
}
export default Register;