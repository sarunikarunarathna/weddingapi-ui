import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../layout/frontend/navbar";

function ServiceLogin () {
    return(
        <div>
            <Navbar />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>SERVICE LOGIN</h4>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="form-group mb-3">
                                        <label>E-Mail</label>
                                        <input type="" name="gmail" value=""  className="form-control"/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Password</label>
                                        <input type="" name="password" value=""  className="form-control"/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button className="btn btn-primary" type="submit"> Login </button>
                                    </div>
                                </form>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Link to="/register">Click here to register..</Link>
                                    </div>
                                    <div className="col-md-6">
                                        <Link to="/login">Click here to User Login..</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ServiceLogin;