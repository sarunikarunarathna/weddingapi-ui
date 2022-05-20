import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import ServiceNavbar from "../../layout/frontend/ServiceNavbar";

function EditService (props) {

    const history = useHistory();

    const [serviceInput, setService] = useState({
        category_id: '',
        serviceName: '',
        location: '',
        sellingPrice: '',
        originalPrice: '',
        description: '',
        authEmail: '',
        status: '',
    });

    const [picture, setPicture] = useState([]);
    const [errorList, setError] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleInput = (e) => {
        e.persist();
        setService({...serviceInput, [e.target.name]:e.target.value});
    }

    const handleImage = (e) => {
        setPicture({image:e.target.files[0]});
    }

    const updateService = (e) => {
        e.preventDefault();

        const service_id = props.match.params.id;

        const formData = new FormData();
        formData.append('image', picture.image);
        formData.append('category_id', serviceInput.category_id);
        formData.append('serviceName', serviceInput.serviceName);
        formData.append('discount', serviceInput.discount);
        formData.append('location', serviceInput.location);
        formData.append('sellingPrice', serviceInput.sellingPrice);
        formData.append('originalPrice', serviceInput.originalPrice);
        formData.append('description', serviceInput.description);
        formData.append('qty', serviceInput.qty);
        formData.append('status', serviceInput.status);

        axios.post(`/api/update-service/${service_id}`, formData).then(res=> {
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
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message, "error");
                history.push('/viewService');
            }
        });
    }

    const [categorylist, setCategoryList] = useState([]);

    useEffect(() => {
        axios.get(`api/all-category`).then(res => {
            if(res.data.status === 200)  
            {
                setCategoryList(res.data.category)
            }
        });

        const service_id = props.match.params.id;
        axios.get(`/api/edit-service/${service_id}`).then(res=>{
            if(res.data.status === 200)
            {
                // console.log(res.data.service);
                setService(res.data.service);
            }
            else if(res.data.status === 404)
            {
                swal("Error", res.data.message,"error");
                history.push('/viewService');
            }
            setLoading(false);
        });

    }, [props.match.params.id, history]);

    // 

    const email = localStorage.getItem('auth_email');
    serviceInput.authEmail = email;
    // 

    if(loading)
    {
        return <h4>Edit Service Data Loading...</h4>
    }

    return (

        <div>
            <div className="row p-5 mb-2 bg-dark text-white">
                <div className="col-md-12">
                    <ServiceNavbar/>
                </div>
            </div>
        
        <div className="container-fluid px-4">
            <div className="mt-5 card mt-4">
                <div className="card-header">
                    <h4>Edit Service
                    <Link to="/viewService" className="btn btn-primary float-end">View Service</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <form onSubmit={updateService} encType="multipart/form-data">

                        <div className="row">
                        <div className="form-group mb-3">
                                <input type="text" name="authEmail" onChange={handleInput} value={serviceInput.authEmail} className="form-control" />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-4">

                            <div className="form-group mb-3">
                                <label>Selet Category</label>
                                <select name="category_id" onChange={handleInput} value={serviceInput.category_id} className="form-control">

                                <option>Select Category</option>
                                    {
                                        categorylist.map((item) => (
                                            <option value={item.id} key={item.id} >{item.name}</option>
                                        ))
                                    }
    
                                    
                                </select>
                                <small className="text-danger">{errorList.category_id}</small>
                            </div>
                            </div>
                            <div className="col-md-4">
                            <div className="form-group mb-3">
                                <label>Service Name</label>
                                <input type="text" name="serviceName" onChange={handleInput} value={serviceInput.serviceName} className="form-control" />
                                <small className="text-danger">{errorList.serviceName}</small>
                            </div>
                            </div>
                            <div className="col-md-4">
                            <div className="form-group mb-3">
                                <label>Location</label>
                                <input type="text" name="location" onChange={handleInput} value={serviceInput.location} className="form-control" />
                                <small className="text-danger">{errorList.location}</small>
                            </div>
                            </div>
                        </div>


                            <div className="form-group mb-3">
                                <label>Description</label>
                                <textarea type="text" name="description" onChange={handleInput} value={serviceInput.description} className="form-control"></textarea>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                <div className="form-group mb-3">
                                <label>Selling Price</label>
                                <input type="text" name="sellingPrice" onChange={handleInput} value={serviceInput.sellingPrice} className="form-control" />
                                <small className="text-danger">{errorList.sellingPrice}</small>
                            </div>
                                </div>
                                <div className="col-md-4">
                                <div className="form-group mb-3">
                                <label>Discount</label>
                                <input type="text" name="discount" onChange={handleInput} value={serviceInput.discount} className="form-control" />
                                </div>
                                </div>
                                <div className="col-md-4">
                                <div className="form-group mb-3">
                                <label>Original Price</label>
                                <input type="text" name="originalPrice" onChange={handleInput} value={serviceInput.originalPrice} className="form-control" />
                                <small className="text-danger">{errorList.originalPrice}</small>
                            </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                <div className="form-group mb-3">
                                <label>Quantity</label>
                                <input type="text" name="qty" onChange={handleInput} value={serviceInput.qty} className="form-control" />
                            </div>
                                </div>
                                <div className="col-md-6">
                                <div className="form-group mb-3">
                                <label>Image</label>
                                <input type="file" name="image" onChange={handleImage} className="form-control" />
                                <small className="text-danger">{errorList.image}</small>
                            </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                <div className="form-group mb-3">
                                <label>Status</label> <br/>
                                <input type="checkbox" name="status" onChange={handleInput} value={serviceInput.status} className="" />
                            </div>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary px-4 mt-2">Submit</button>
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
export default EditService;