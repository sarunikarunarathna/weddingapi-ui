import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

import ServiceNavbar from "../../layout/frontend/ServiceNavbar";


function viewService()
{

    const [loading, setLoading] = useState(true);
    const [viewService, setService] = useState([]);

    const email = localStorage.getItem('auth_email');

    useEffect(() => {
        const category_id = email;
        axios.get(`/api/view-service/${category_id}`).then(res=>{
            if(res.data.status === 200) 
            {
                // console.log(category_id)
                // console.log(res.data.servise);
                setService(res.data.servise);
                setLoading(false);
            }
        });
    }, []);

    const deleteService = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/delete-service/${id}`).then(res=> {
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

    var display_servicedate = "";
    if(loading)
    {
        return <h4>View Service Loading</h4>
    }
    else
    {
        display_servicedate = viewService.map( (item) => {
            return (
                <tr key={item.id}>
                    {/* <td>{item.id}</td> */}
                    <td>{item.serviceName}</td>
                    <td>{item.location}</td>
                    <td>{item.sellingPrice}</td>
                    <td>{item.originalPrice}</td>
                    <td>{item.qty}</td>
                    <td>{item.description}</td>
                    <td> <img src={`http://localhost:8000/${item.image}`} width="100px" height="80px" alt={item.name} /> </td>
                    <td><Link to={`edit-Service/${item.id}`} className="btn btn-success">EDIT</Link></td>
                    <td><Link type="button" onClick={ (e) => deleteService(e, item.id)} className="btn btn-danger">DELATE</Link></td>
                </tr>
            )
        });
    }


    return (
        <div>
        <div className="row p-5 mb-2 bg-dark text-white">
            <div className="col-md-12">
                <ServiceNavbar/>
            </div>
        </div>

        <div className="card px-4 mt-3">
            <div className="card-header">
                <h4>View Service
                    <Link to="/addService" className="btn btn-primary float-end">Add Service</Link>
                </h4>
            </div>

            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Service Name</th>
                                <th>Location</th>
                                <th>Selling Price</th>
                                <th>Original Price</th>
                                <th>Qantity</th>
                                <th>Description</th>
                                <th>Image</th>
                                <th>EDIT</th>
                                <th>DELETE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {display_servicedate}
                        </tbody>
                    </table>
                </div>
            </div>

            <script></script>
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

export default viewService;