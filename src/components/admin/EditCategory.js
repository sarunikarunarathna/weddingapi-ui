import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import swal from "sweetalert";

function EditCategory (props) {

    const history = useHistory();


    const [categoryInput, setCategory] = useState({
        name: '',
        description: '',
    });

    const [picture, setPicture] = useState([]);
    const [errorList, setError] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleInput = (e) => {
        e.persist();
        setCategory({...categoryInput, [e.target.name]:e.target.value});
    }

    const handleImage = (e) => {
        setPicture({image:e.target.files[0]});
    }

    useEffect(() => {
        const category_id = props.match.params.id;
        axios.get(`/api/edit-category/${category_id}`).then(res=>{
            if(res.data.status === 200)
            {
                // console.log(res.data.category);
                setCategory(res.data.category);
            }
            else if(res.data.status === 404)
            {
                swal("Error", res.data.message,"error");
                history.push('/admin/viewCategory');
            }
            setLoading(false);
        });
    }, [props.match.params.id, history]);

    const updateCategory = (e) => {
        e.preventDefault();

        const category_id = props.match.params.id;

        const formData = new FormData();
        formData.append('image', picture.image);
        formData.append('name', categoryInput.name);
        formData.append('description', categoryInput.description);

        axios.post(`/api/update-category/${category_id}`, formData).then(res=> {
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
                history.push('/admin/viewCategory');
            }
        });
    }

    if(loading)
    {
        return <h4>Edit Category Data Loading...</h4>
    }

    return (
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Edit Category
                    <Link to="/admin/viewCategory" className="btn btn-primary float-end">View Category</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <form onSubmit={updateCategory} encType="multipart/form-data">
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
                                <img src={`http://localhost:8000/${categoryInput.image}`} width="100px" height="80px" />
                                <small className="text-danger">{errorList.image}</small>
                            </div>
                            <button type="submit" className="btn btn-primary px-4 mt-2">Submit</button>
                    </form>
                </div>
            </div>            
        </div>
    )
}
export default EditCategory;