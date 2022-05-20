import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import swal from "sweetalert";

function AddCategory () {
    const history = useHistory();

    const [categoryInput, setCategory] = useState({
        name: '',
        description: '',
        status: '',
    });

    const [picture, setPicture] = useState([]);
    const [errorList, setError] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setCategory({...categoryInput, [e.target.name]:e.target.value});
    }

    const handleImage = (e) => {
        setPicture({image:e.target.files[0]});
    }

    const submitCategory = (e) => {
        e.preventDefault();
 
        const formData = new FormData();
        formData.append('image', picture.image);
        formData.append('name', categoryInput.name);
        formData.append('description', categoryInput.description);
        formData.append('status', categoryInput.status);

        axios.post('/api/store-category', formData).then(res=> {
            if(res.data.status === 200) 
            {
                swal("Success",res.data.message,"success");
                history.push('/admin/viewCategory');
                setError([]);
            }
            else if(res.data.status === 422)
            {
                swal("All Fields Are Mandatory", "", "error");
                setError(res.data.errors);
            }
        });
    }

    return (
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Add Category
                    <Link to="/admin/viewCategory" className="btn btn-primary float-end">View Category</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <form onSubmit={submitCategory} encType="multipart/form-data">
                        <div className="form-group mb-3">
                                <label>Category Name</label>
                                <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className="form-control" />
                                <small className="text-danger">{errorList.name}</small>
                            </div>
                            <div className="form-group mb-3">
                                <label>Description</label>
                                <textarea type="text" name="description" onChange={handleInput} value={categoryInput.description} className="form-control"></textarea>
                            </div>
                            <div className="form-group mb-3">
                                <label>Image</label>
                                <input type="file" name="image" onChange={handleImage} className="form-control" />
                                <small className="text-danger">{errorList.image}</small>
                            </div>
                            <div className="form-group mb-3">
                                <label>Status</label> <br/>
                                <input type="checkbox" name="status" onChange={handleInput} value={categoryInput.status} className="" />
                            </div>
                            <button type="submit" className="btn btn-primary px-4 mt-2">Submit</button>
                    </form>
                </div>
            </div>            
        </div>
    )
}
export default AddCategory;