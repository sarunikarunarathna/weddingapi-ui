import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../../layout/frontend/navbar";

function OffersToUser()
{

    const [loading, setLoading] = useState(true);
    const [offer, setOffer] = useState([]);

    useEffect(() => {
      
        axios.get('/api/get-offer').then(res=>{
            if(res.data.status === 200) 
            {
                // console.log(res.data.offer)
                setOffer(res.data.offer);
                setLoading(false);
            }
        });
    }, []);

    if(loading)
    {
        return <h4>Loading offers...</h4>
    }
    else
    {
        var showOfferList = '';
        showOfferList = offer.map( (item, idx) => {
            if(item.discount == 'undefined') 
            { 
                // nothing to disply ,this service haven't discount
            }
        else
            return (
                <div className="col-md-4" key={idx}>
                    <div className="card">
                        <div className="row">
                            <div className="card">
                            <span className="float-end badge bt-sm btn-danger badge-pil">{item.discount} %</span>
                                    <Link to={`/categoryToUser/${item.serviceName}`}>
                                    <img src={`http://localhost:8000/${item.image}`} className="w-100" alt={item.name} />
                                        </Link>
                                <div className="card-body">
                                    <h5>{item.serviceName}</h5>
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

            <div className="row p-3 mb-2">
                <div className="col-md-12">
                    <h2><b>Offer List</b></h2>
                </div>
            </div>

            <div className="py-3">
                <div className="container">
                    <div className="row mt-2 mb-2">
                        {showOfferList}
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

export default OffersToUser;