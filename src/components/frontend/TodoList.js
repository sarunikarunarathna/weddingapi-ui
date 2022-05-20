import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Navbar from "../../layout/frontend/navbar";


function TodoList()
{
    
    // store
    const [todoInput, setTodoList] = useState({
        todoDes: '',
        authEmail: '',
    });

    const [errorList, setError] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setTodoList({...todoInput, [e.target.name]:e.target.value});
    }

    const submitTodo = (e) => {
        e.preventDefault();
 
        const formData = new FormData();
        formData.append('todoDes', todoInput.todoDes);
        formData.append('authEmail', todoInput.authEmail);

        axios.post('/api/store-todo', formData).then(res=> {
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
        });
    }

    // 
    const email = localStorage.getItem('auth_email');
    todoInput.authEmail = email;
    // 

    // get total todolist
    const [loading, setLoading] = useState(true);
    const [viewTodolist, setTodolist] = useState([]);

    const totalList = viewTodolist.length;

    useEffect(() => {
        const user_id = email;
        axios.get(`/api/view-todolist/${user_id}`).then(res=>{
            if(res.data.status === 200) 
            {
                setTodolist(res.data.todolist);
                setLoading(false);
            }
        });
    }, []);

        // get total completed tast
        const [viewCompleted, setcompletedlist] = useState([]);
    
        const totalcompetedList = viewCompleted.length;
    
        useEffect(() => {
            const user_id = email;
            axios.get(`/api/view-completedtask/${user_id}`).then(res=>{
                if(res.data.status === 200) 
                {
                    setcompletedlist(res.data.completedtask);
                }
            });
        }, []);

        // get total to be complete
    const [viewtobeComplete, settobecompletlist] = useState([]);

    const tobecompleteList = viewtobeComplete.length;

    useEffect(() => {
        const user_id = email;
        axios.get(`/api/view-tobecomplete/${user_id}`).then(res=>{
            if(res.data.status === 200) 
            {
                settobecompletlist(res.data.tobecomplete);
            }
        });
    }, []);

    // update completed

    const [complatedInput, setCompletedlist] = useState({
        isCompleted: '',
    });

    const chandleInput = (e) => {
        e.persist();
        setCompletedlist({...complatedInput, [e.target.name]:e.target.value});
    }

    const complstedList = (e , id) => {
        e.preventDefault();
 
        const formData = new FormData();
        formData.append('isCompleted', complatedInput.isCompleted);

        axios.post(`/api/edit-completedTodo/${id}`, formData).then(res=> {
            if(res.data.status === 200) 
            {
                swal("Success",res.data.message,"success");
            }
        });
    }

    // delete
    const deleteTodolist = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/delete-todolist/${id}`).then(res=> {
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

    var display_TodolistData = "";
    var display_ToBeComplete = "";
    if(loading)
    {
        return <h4>View TodoList Loading</h4>
    }
    else
    {
        // wen i add the list it will automatically refresh -> please do it
        display_TodolistData = viewTodolist.map( (item) => {
            if(item.isCompleted === 'yes')
            {
                return (
                    <div>
                        <table id="example" className="table table-striped">
                            <tbody>
                            <tr key={item.id}>
                                {/* <td>{item.id}</td> */}
                                <td className="col-md-9"><s>{item.todoDes}</s> <br />{item.created_at}</td>
                                <td className="col-md-1">
                                <input type="checkbox" name="isCompleted"
                                onChange={chandleInput} value={complatedInput.isCompleted} className="w-100" />
                                <button onClick={ (e) => complstedList(e, item.id)} className="btn btn-dark"><i className="fa fa-times" /></button>
                                </td>
                                <td className="col-md-1"><Link to={`edit-todolist/${item.id}`} className="btn btn-success"><i class="fas fa-edit"></i></Link></td>
                                <td className="col-md-1"><Link type="button" onClick={ (e) => deleteTodolist(e, item.id)} className="btn btn-danger"><i className="fa fa-trash" /></Link></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                )
            }
              
        });

        display_ToBeComplete = viewTodolist.map( (item) => {
            if(item.isCompleted === 'no')
            {
                return (
                    <div>
                        <table className="table table-striped">
                            <tbody>
                            <tr key={item.id}>
                                {/* <td>{item.id}</td> */}
                                <td className="col-md-9">{item.todoDes} <br /> {item.created_at}</td>
                                <td className="col-md-1">
                                <input type="checkbox" name="isCompleted"
                                onChange={chandleInput} value={complatedInput.isCompleted} className="w-100" />
                                <button onClick={ (e) => complstedList(e, item.id)} className="btn btn-dark"><i className="fa fa-times" /></button>
                                </td>
                                <td className="col-md-1"><Link to={`edit-todolist/${item.id}`} className="btn btn-success"><i class="fa fa-pencil"></i></Link></td>
                                <td className="col-md-1"><Link type="button" onClick={ (e) => deleteTodolist(e, item.id)} className="btn btn-danger"><i className="fa fa-trash" /></Link></td>
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
                    <h2><b>To - Do List</b></h2>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-2">
                        {/* chanage font size font */}
                    <input disabled type="text" className="form-control py-3 text-center" value={totalList} name="todoDes" />
                    <p className="text-center">All Tasks</p>
                    </div>
                    <div className="col-md-2">
                        {/* chanage font size font */}
                    <input disabled type="text" className="form-control py-3 text-center" value={totalcompetedList} name="todoDes" />
                    <p className="text-center">Task Complated</p>
                    </div>
                    <div className="col-md-2">
                        {/* chanage font size font */}
                    <input disabled type="text" className="form-control py-3 text-center" value={tobecompleteList} name="todoDes" />
                    <p className="text-center">Tasks to Complete</p>
                    </div>
                </div>
                        
                </div>

                <div className="row bg-secondary ">
                    <div className="col-md-4 py-2">

                    </div>
                    <div className="col-md-3 py-3">
                        					
                    <form onSubmit={submitTodo} encType="multipart/form-data">

                        <div className="row">
                        <div className="form-group">
                                <input type="hidden" name="authEmail" onChange={handleInput} value={todoInput.authEmail} className="form-control" />
                            </div>
                        </div>

                            <div className="row">
                            <div className="input-group ">
                                <input type="text" className="form-control" placeholder="Enter List..." aria-label="List" 
                                name="todoDes" onChange={handleInput} value={todoInput.todoDes}
                                aria-describedby="basic-addon2" />

                                <div className="input-group-append">
                                    <button className="btn btn-outline-dark" type="submit"><i className="fas fa-plus"></i></button>
                                </div>
                            </div>
                            <small className="text-danger">{errorList.todoDes}</small>
                            
                            </div>
                        </form>
                    </div>
                    <div className="col-md-2 py-3">
                    <Link to={'completedTodoList'} className="btn btn-outline-dark"><i className="fas fa-search"></i> Completed</Link>
                    </div>
                </div>

                <div className="row">
					<div className="col-10 col-md-8 mx-auto mt-4">

                        <h4 className="text-capitalize "><b>Your Tasks</b></h4>
                        <div className="card-body">
                        <div className="table-responsive">
                        {display_TodolistData}
                        {display_ToBeComplete}
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

export default TodoList;