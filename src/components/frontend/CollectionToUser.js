import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../../layout/frontend/navbar";

function CollectionToUser()
{

    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState([]);

    useEffect(() => {
      
        axios.get('/api/get-category').then(res=>{
            if(res.data.status === 200) 
            {
                // console.log(res.data.category)
                setCategory(res.data.category);
                setLoading(false);
            }
        });
    }, []);

    if(loading)
    {
        return <h4>Loading categories...</h4>
    }
    else
    {
        var showCatList = '';
        showCatList = category.map( (item, idx) => {
            return (
                <div className="col-md-4" key={idx}>
                    <div className="card">
                        <div className="row">
                            <div className="card">
                                <Link to={`collectionToUser/${item.name}`}>
                                    <img src={`http://localhost:8000/${item.image}`} className="w-100" alt={item.name}></img>
                                </Link>
                                <div className="card-body">
                                    <h5 className="text-center">{item.name}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        });
    }

    return (

        <div>
            <div className="row p-5 mb-2 bg-dark text-white">
                <div className="col-md-12">
                    <Navbar/>
                </div>
            </div>

            <div className="">
                <div className="container pt-2 pb-2">
                    <div className="row">
                        <h5><b>Category Data</b></h5>
                    </div>
                </div>
            </div>

            <div className="py-3">
                <div className="container">
                    <div className="row mt-2 mb-2">
                        {showCatList}
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

export default CollectionToUser;