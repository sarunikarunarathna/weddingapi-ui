import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import Navbar from "../../layout/frontend/navbar";


function AddBudgetPlan()
{
    const history = useHistory();
    
    // store
    const [budgetInput, setBudgetList] = useState({
        authEmail: '',
        serviceName: '',
        actusalCost: '',
        budgetCost: '',
        paidAmount: '',
    });

    const [errorList, setError] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setBudgetList({...budgetInput, [e.target.name]:e.target.value});
    }

    const submitTodo = (e) => {
        e.preventDefault();
 
        const formData = new FormData();
        formData.append('authEmail', budgetInput.authEmail);
        formData.append('serviceName', budgetInput.serviceName);
        formData.append('actusalCost', budgetInput.actusalCost);
        formData.append('budgetCost', budgetInput.budgetCost);
        formData.append('paidAmount', budgetInput.paidAmount);

        axios.post('/api/store-budget', formData).then(res=> {
            if(res.data.status === 200) 
            {
                swal("Success",res.data.message,"success");
                history.push('/budgetPlanning');
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
    const email = localStorage.getItem('auth_email');
    budgetInput.authEmail = email;
    // 

    // all service

    const [serviceList, setServiceList] = useState([]);

    useEffect(() => {
        axios.get(`api/all-service`).then(res => {
            if(res.data.status === 200)  
            {
                setServiceList(res.data.service)
            }
        });
    }, []);

    // 
  
    return (

        <div>
            <div className="row p-5 mb-2 bg-dark text-white">
                <div className="col-md-12">
                <Navbar />
                </div>
            </div>

            <div className="row p-3 mb-2">
                <div className="col-md-12">
                    <h2><b>Add Budget Plan</b></h2>
                </div>
            </div>

            <div className="container">
				<div className="row">
					<div className="col-10 col-md-8 mx-auto mt-4">
						
                        <form onSubmit={submitTodo} encType="multipart/form-data">

                        <div className="row">
                        <div className="form-group mb-3">
                                <input type="hidden" name="authEmail" onChange={handleInput} value={budgetInput.authEmail} className="form-control" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group mb-3">
                                <select name="serviceName" onChange={handleInput} value={budgetInput.serviceName} className="form-control">

                                <option>Select Budget Item</option>
                                    {
                                        serviceList.map((item) => (
                                            <option value={item.serviceName} key={item.id} >{item.serviceName} - {item.sellingPrice}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        <small className="text-danger">{errorList.serviceName}</small>

                        </div>

                        <div className="row">
                        <div className="form-group mb-3">
                                <input type="text" placeholder="Enter Above Actual Cost..." name="actusalCost" onChange={handleInput} value={budgetInput.actusalCost} className="form-control" />
                            </div>
                        </div>
                        <small className="text-danger">{errorList.actusalCost}</small>

                        <div className="row">
                        <div className="form-group mb-3">
                                <input type="text" placeholder="Enter Your Budget Cost..." name="budgetCost" onChange={handleInput} value={budgetInput.budgetCost} className="form-control" />
                            </div>
                        </div>
                        <small className="text-danger">{errorList.budgetCost}</small>

                        <div className="row">
                        <div className="form-group mb-3">
                                <input type="text" placeholder="Enter Your Paid Amount..." name="paidAmount" onChange={handleInput} value={budgetInput.paidAmount} className="form-control" />
                            </div>
                        </div>
                            <small className="text-danger">{errorList.paidAmount}</small>

                            <div className="input-group-append">
                                    <button className="btn btn-primary" type="submit">Add</button>
                            </div>
                        </form>

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

export default AddBudgetPlan;