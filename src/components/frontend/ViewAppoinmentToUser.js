import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Navbar from "../../layout/frontend/navbar";


function ViewAppoinmentToUser(props)
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


// 
        const email = localStorage.getItem('auth_email');
        // 

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
                                <td className="col-md-2"><button className="btn btn-danger">{item.response}</button></td>
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
                    <h2><b>View Appoinment</b></h2>
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

export default ViewAppoinmentToUser;