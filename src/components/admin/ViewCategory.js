import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";


function ViewCategory()
{

    const [loading, setLoading] = useState(true);
    const [viewCategory, setCategory] = useState([]);

    useEffect(() => {
        axios.get('/api/view-category').then(res=>{
            if(res.data.status === 200) 
            {
                // console.log(res.data.categories);
                setCategory(res.data.categories);
                setLoading(false);
            }
        });
    }, []);

    const deleteCategory = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/delete-category/${id}`).then(res=> {
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

    var display_categorydate = "";
    if(loading)
    {
        return <h4>View Category Loading</h4>
    }
    else
    {
        display_categorydate = viewCategory.map( (item) => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td> <img src={`http://localhost:8000/${item.image}`} width="100px" height="80px" alt={item.name} /> </td>
                    <td><Link to={`editCategory/${item.id}`} className="btn btn-success">EDIT</Link></td>
                    <td><Link type="button" onClick={ (e) => deleteCategory(e, item.id)} className="btn btn-danger">DELATE</Link></td>
                </tr>
            )
        });
    }


    return (
        <div className="card px-4 mt-3">
            <div className="card-header">
                <h4>View Category
                    <Link to="/admin/addCategory" className="btn btn-primary float-end">Add Category</Link>
                </h4>
            </div>

            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Category Name</th>
                                <th>Description</th>
                                <th>Image</th>
                                <th>EDIT</th>
                                <th>DELETE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {display_categorydate}
                        </tbody>
                    </table>
                </div>
            </div>

            <script></script>
        </div>
    )
}

export default ViewCategory;