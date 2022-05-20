import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import Navbar from "../../layout/frontend/navbar";


function EditTodoList(props)
{
    const history = useHistory();

    const [todoInput, setTodolist] = useState({
        todoDes: '',
    });

    const [errorList, setError] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleInput = (e) => {
        e.persist();
        setTodolist({...todoInput, [e.target.name]:e.target.value});
    }

    const updateTodo = (e) => {
        e.preventDefault();

        const todo_id = props.match.params.id;

        const formData = new FormData();
        formData.append('todoDes', todoInput.todoDes);

        axios.post(`/api/update-todolist/${todo_id}`, formData).then(res=> {
            if(res.data.status === 200) 
            {
                swal("Success",res.data.message,"success");
                history.push('/todolist');
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
                history.push('/todolist');
            }
        });
    }

    useEffect(() => {
        const todo_id = props.match.params.id;
        axios.get(`/api/edit-todolist/${todo_id}`).then(res=>{
            if(res.data.status === 200)
            {
                setTodolist(res.data.todolist);
            }
            else if(res.data.status === 404)
            {
                swal("Error", res.data.message,"error");
                history.push('/todolist');
            }
            setLoading(false);
        });

    }, [props.match.params.id, history]);

    if(loading)
    {
        return <h4>Edit TodoList Data Loading...</h4>
    }

   
    return (

        <div>
            <div className="row p-5 mb-2 bg-dark text-white">
                <div className="col-md-12">
                <Navbar />
                </div>
            </div>

            <div className="container">
				<div className="row">
					<div className="col-10 col-md-8 mx-auto mt-4">
						<h3 className="text-capitalize text-center">TodoInput</h3>

                        						
                        <form onSubmit={updateTodo} encType="multipart/form-data">

                            <div className="row">
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Enter List..." aria-label="List" 
                                 name="todoDes" onChange={handleInput} value={todoInput.todoDes}
                                aria-describedby="basic-addon2" />

                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" type="submit"><i className="fas fa-plus"></i></button>
                                </div>
                            </div>
                            <small className="text-danger">{errorList.todoDes}</small>
                            
                            </div>
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

export default EditTodoList;