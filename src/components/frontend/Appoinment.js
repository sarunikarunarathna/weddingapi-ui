import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Navbar from "../../layout/frontend/navbar";


function Appoinment(props)
{    
        // delete
    const deleteAppoinment = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/delete-appoinment/${id}`).then(res=> {
            if(res.data.status === 200)
            {
                swal("Success", res.data.message, "success");
                thisClicked.closest("tr").remove();
            }
            else if(res.data.status === 404)
            {
                swal("Success", res.data.message, "success");
                thisClicked.innerText = "Delete";
            }
        });
    }

        // store
        const [appoinmentInput, setAppoinment] = useState({
            appoinment: '',
            userEmail: '',
            userName: '',
            serviceEmail: '',
            serviceName: '',
            service_id: '',
        });
    
        const [errorList, setError] = useState([]);
    
        const handleInput = (e) => {
            e.persist();
            setAppoinment({...appoinmentInput, [e.target.name]:e.target.value});
        }
    
        const submitAppoinment = (e) => {
            e.preventDefault();
     
            const formData = new FormData();
            formData.append('appoinment', appoinmentInput.appoinment);
            formData.append('userEmail', appoinmentInput.userEmail);
            formData.append('userName', appoinmentInput.userName);
            formData.append('serviceEmail', appoinmentInput.serviceEmail);
            formData.append('serviceName', appoinmentInput.serviceName);
            formData.append('service_id', appoinmentInput.service_id);
    
            axios.post('/api/store-appoinment', formData).then(res=> {
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
            });
        }
// 
        const email = localStorage.getItem('auth_email');
        const name = localStorage.getItem('auth_name');
        appoinmentInput.userEmail = email;
        appoinmentInput.userName = name;
        // 

            // get service by id
    const [viewService, setService] = useState([]);

    const service_id = props.match.params.id;

    useEffect(() => {
        axios.get(`/api/details-service/${service_id}`).then(res=>{
            if(res.data.status === 200) 
            {
                console.log(res.data.service)
                setService(res.data.servise);
            }
        });
    }, []);

    var displayService = "";

    displayService = viewService.map( (item) => {
        appoinmentInput.serviceName = item.serviceName;
        appoinmentInput.serviceEmail = item.authEmail;
        appoinmentInput.service_id = item.id;
    })

    // get all appoinment

    const [loading, setLoading] = useState(true);
    const [viewAppoinment, setAppoinmentList] = useState([]);


    useEffect(() => {
        const user_id = email;
        axios.get(`/api/view-appoinment/${user_id}`).then(res=>{
            if(res.data.status === 200) 
            {
                setAppoinmentList(res.data.appoinment);
                setLoading(false);
            }
        });
    }, []);

    var display_Appoinment = "";
    var display_Success_Appoinment = "";
    if(loading)
    {
        return <h4>View Appoinmet Loading</h4>
    }
    else
    {
        // wen i add the list it will automatically refresh -> please do it
        display_Appoinment = viewAppoinment.map( (item) => {
            if(item.response === 'Not Accept Yet')
            {
                return (
                    <div>
                        <table className="table table-striped">
                            <tbody>
                            <tr key={item.id}>
                                <td className="col-md-8"><b>{item.serviceName} : </b>{item.appoinment}</td>
                                <td className="col-md-2"><button className="btn btn-danger ">{item.response}</button></td>
                                <td className="col-md-1"><Link type="button" onClick={ (e) => deleteAppoinment(e, item.id)} ><i className="fa fa-trash" /></Link></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                )
            }
        });

        display_Success_Appoinment = viewAppoinment.map( (item) => {
            if(item.response === 'Accepted')
            {
                return (
                    <div>
                        <table className="table table-striped">
                            <tbody>
                            <tr key={item.id}>
                                <td className="col-md-8"><b>{item.serviceName} : </b>{item.appoinment}</td>
                                <td className="col-md-2"><button className="btn btn-success">{item.response}</button></td>
                                <td className="col-md-1"><Link type="button" onClick={ (e) => deleteAppoinment(e, item.id)} ><i className="fa fa-trash" /></Link></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                )
            }
        });
    }

    return (

        <div>
            <div className="row p-5 mb-2 bg-dark text-white">
                <div className="col-md-12">
                <Navbar />
                </div>
            </div>

            <div className="row p-3 mb-2">
                <div className="col-md-12">
                    <h2><b>Make Appoinment</b></h2>
                </div>
            </div>

            <div className="row bg-secondary py-3">
                <div className="col-md-3"></div>
                <div className="col-md-6 py-1">
                <form onSubmit={submitAppoinment}>

                    <div className="row">
                    <div className="col-md-3">
                            <input type="hidden" name="userEmail" onChange={handleInput} value={appoinmentInput.userEmail} className="form-control" />
                        </div>
                        <div className="col-md-3">
                            <input type="hidden" name="userName" onChange={handleInput} value={appoinmentInput.userName} className="form-control" />
                        </div>
                        <div className="col-md-3">
                            <input type="hidden" name="serviceEmail" onChange={handleInput} value={appoinmentInput.serviceEmail} className="form-control" />
                        </div>
                        <div className="col-md-2">
                            <input type="hidden" name="serviceName" onChange={handleInput} value={appoinmentInput.serviceName} className="form-control" />
                        </div>
                        <div className="col-md-1">
                            <input type="hidden" name="service_id" onChange={handleInput} value={appoinmentInput.service_id} className="form-control" />
                        </div>
                    </div>

                        <div className="row">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Enter Appoinment..." aria-label="List" 
                            name="appoinment" onChange={handleInput} value={appoinmentInput.appoinment}
                            aria-describedby="basic-addon2" />

                            <div className="input-group-append">
                                <button className="btn btn-outline-dark" type="submit"><i className="fas fa-plus"></i></button>
                            </div>
                        </div>
                        <small className="text-danger">{errorList.appoinment}</small>
                        
                        </div>
                    </form>
                </div>
            </div>

            <div className="container">
				<div className="row">
					<div className="col-10 col-md-8 mx-auto mt-4">

                        <div className="card-body">
                        <div className="table-responsive">
                        {display_Appoinment}
                        {display_Success_Appoinment}
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

export default Appoinment;