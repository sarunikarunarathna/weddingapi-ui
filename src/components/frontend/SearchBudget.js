import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Navbar from "../../layout/frontend/navbar";


function SearchBudget()
{    
        // get total todolist
        const [loading, setLoading] = useState(true);
        const [viewBudgetlist, setBudgetList] = useState([]);

    // 
    const email = localStorage.getItem('auth_email');
    // 
    
        useEffect(() => {
            const user_id = email;
            axios.get(`/api/view-budgetList/${user_id}`).then(res=>{
                if(res.data.status === 200) 
                {
                    setBudgetList(res.data.budgetList);
                    setLoading(false);
                }
            });
        }, []);
        // 

    var display_BudgetData = "";
    if(loading)
    {
        return <h4>View Budget Loading</h4>
    }
    else
    {
        // wen i add the list it will automatically refresh -> please do it
        display_BudgetData = viewBudgetlist.map( (item) => {
            return (
                <div>
                    <table className="table table-striped">
                        <tbody>
                        <tr key={item.id}>
                            {/* <td>{item.id}</td> */}
                            <td className="col-md-3">{item.service_id}</td>
                            <td className="col-md-3">{item.budgetCost}</td>
                            <td className="col-md-3">{item.actusalCost}</td>
                            <td className="col-md-2">{item.paidAmount}</td>
                            <td ><Link type="button" onClick={ (e) => deleteBudget(e, item.id)} className="btn btn-danger float-end"><i className="fa fa-trash" /></Link></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )
        });
    }

    // budgetCost
    var budgetCost = 0;
     viewBudgetlist.map( (item) => {
        budgetCost = budgetCost + item.budgetCost;
    });
    // 

        // ActualCost
        var actualCost = 0;
        viewBudgetlist.map( (item) => {
            actualCost = actualCost + item.actusalCost;
       });
       // 

           // paidAmount
            var paidAmount = 0;
            viewBudgetlist.map( (item) => {
                paidAmount = paidAmount + item.paidAmount;
        });
        // 

        // owing
        var owing = 0;
        owing = actualCost - paidAmount; 
        // 

        // delete
        const deleteBudget = (e, id) => {
            e.preventDefault();
    
            const thisClicked = e.currentTarget;
            thisClicked.innerText = "Deleting";
    
            axios.delete(`/api/delete-budget/${id}`).then(res=> {
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

     
    return (

        <div>
            <div className="row p-5 mb-2 bg-dark text-white">
                <div className="col-md-12">
                <Navbar />
                </div>
            </div>

            <div className="row p-3 mb-2">
                <div className="col-md-12">
                    <h2><b>Your Wedding Budget Plan</b></h2>
                </div>
            </div>

            <div className="row p-3 py-0 mb-1">
                <div className="col-md-12">
                    <p><b>Budget Summary</b></p>
                </div>
            </div>

            <div className="container">
            <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-2">
                        {/* chanage font size font */}
                    <input disabled type="text" className="form-control h-200 py-4 text-center" value={budgetCost} name="todoDes" />
                    <p className="text-center"><b>Budget Cost</b></p>
                    </div>
                    <div className="col-md-2">
                        {/* chanage font size font */}
                    <input disabled type="text" className="form-control h-200 py-4 text-center" value={actualCost} name="todoDes" />
                    <p className="text-center"><b>Actual Cost</b></p>
                    </div>
                    <div className="col-md-2">
                        {/* chanage font size font */}
                    <input disabled type="text" className="form-control h-200 py-4 text-center" value={paidAmount} name="todoDes" />
                    <p className="text-center"><b>Paid</b></p>
                    </div>
                    <div className="col-md-2">
                        {/* chanage font size font */}
                    <input disabled type="text" className="form-control h-200 py-4 text-center" value={owing} name="todoDes" />
                    <p className="text-center"><b>Owing</b></p>
                    </div>
                </div>
                </div>

                <div className="row bg-secondary ">

                    <div className="col-md-3 py-3"></div>
                    <div className="col-md-2 py-3">
                    <Link to={'add-palan'} className="btn btn-outline-dark"><i className="fas fa-plus"></i> Add Budget Item</Link>
                    </div>

                    <div className="col-md-2 py-3">
                    <Link to={'budgetPlanning'} className="btn btn-outline-dark"><i className="fas fa-search"></i>View All Items</Link>
                    </div>

                    <div className="col-md-3 py-3">
                        <div className="input-group mb-3">
                        <select name="budget_item" >

                        <option>Seach Your Budget Items</option>
                            {
                                viewBudgetlist.map((item) => (
                                    <option value={item.id} key={item.id} >{item.service_id}</option>
                                ))
                            } 
                        </select>
                                <div className="input-group-append">
                                <Link className="btn btn-outline-dark"><i className="fas fa-search"></i> </Link>
                                </div>
                        </div>                      
                    </div>
                            
                    </div>
              

				<div className="row">
					<div className="col-10 col-md-8 mx-auto mt-4">

                        <div className="card-body">
                        <div className="table-responsive">
                            <div className="row">
                                <div className="col-md-3"><h6><b>Your Budget Item</b></h6></div>
                                <div className="col-md-3"><h6><b>Budget Cost</b></h6></div>
                                <div className="col-md-3"><h6><b>Actual Cost</b></h6></div>
                                <div className="col-md-2"><h6><b>Paid</b></h6></div>
                                <div className="col-md-2"></div>
                            </div>
                        {display_BudgetData}
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

export default SearchBudget;