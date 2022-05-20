import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import Navbar from "../../layout/frontend/navbar";

function ProductsCatWizeToUser(props)
{

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [service, setService] = useState([]);
    const [category, setCategory] = useState([]);

    const serviceCount = service.length;

    useEffect(() => {
 
        const name = props.match.params.name;
        axios.get(`/api/fetchService/${name}`).then(res=>{
            if(res.data.status === 200) 
            {
                // console.log(res.data.service_data.service)
                setService(res.data.service_data.service);
                setCategory(res.data.service_data.category);
                setLoading(false);
            }
            else if(res.data.status == 400)
            {
                swal("warning",res.data.message, "error");
            }
            else if(res.data.status == 404)
            {
                history.push('/collections');
                swal("warning",res.data.message, "error");
            }
        });
    }, [props.match.params.name, history]);

    if(loading)
    {
        return <h4>Loading Service...</h4>
    }
    else
    {
        var showServiceList = '';
        var serviceName;
        if(serviceCount)
        {
            showServiceList = service.map( (item, idx) => {
                serviceName = item.serviceName;
                return(
                    <div className="col-md-4" key={idx}>
                        <div className="card">
                            <Link to={`/categoryToUser/${item.serviceName}`}>
                            <img src={`http://localhost:8000/${item.image}`} className="w-100" alt={item.name}></img>
                            </Link>
                            <div className="card-body">
                                <h5 className="text-center">{item.serviceName}</h5> 
                            </div>
                            
                        </div>
                    </div>
                )
            }); 
        }
        else
        { 
            showServiceList =
            <div className="col-md-12">
                <h4>No Service Available {serviceName}... </h4>
            </div>
        }
    }
    const name = props.match.params.name;

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
                        <h5><b>Category / {name}</b></h5>
                    </div>
                </div>
            </div>

            <div className="py-3">
                <div className="container">
                    <div className="row mt-2 mb-2">
                        {showServiceList}
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

export default ProductsCatWizeToUser;