
import '../../assets/frontend/css/styles.css';

import React, { useEffect, useState } from "react";

import '../../assets/frontend/css/styles.css';
import '../../assets/frontend/css/all.css';
import '../../assets/frontend/css/all2.css';

import '../../assets/frontend/js/scripts.js';

import { Link } from "react-router-dom";

import axios from "axios";

function Dashboard () {
    const [ItemInput, setSelectedItem] = useState({
        item_Id: '',
    });

    const handleItemInput = (e) => {
        e.persist();
        setSelectedItem({...ItemInput, [e.target.name]:e.target.value});
    }

    const [item, setItem] = useState([]);

        // 
        const user_mail = localStorage.getItem('auth_email');
        // 

    useEffect(() => {
      
        axios.get(`/api/get-item/${user_mail}`).then(res=>{
            if(res.data.status === 200) 
            {
                console.log(res.data.item)
                setItem(res.data.item);
            }
        });
    }, []);

    // 

        // 

        const [searchItem, setSearchItem] = useState([]);

        const searchItemToGet = (e, item_Id) => {
            axios.get(`/api/search-item/${item_Id}`).then(res=>{
                if(res.data.status === 200) 
                {
                    setSearchItem(res.data.item);
                }
            });
        }
    
        var showSearchItemList = '';
        showSearchItemList = searchItem.map( (item, idx) => {
            return (
                <div>
                <table className="table table-striped">
               
                    <tbody>
                    <tr>
                                <td className="col-md-3"><h6><b>Your Budget Item</b></h6></td>
                                <td className="col-md-3"><h6><b>Budget Cost</b></h6></td>
                                <td className="col-md-3"><h6><b>Actual Cost</b></h6></td>
                                <td className="col-md-2"><h6><b>Paid</b></h6></td>
                                <td className="col-md-2"></td>
                            </tr>
                    <tr key={item.id}>
                        {/* <td>{item.id}</td> */}
                        <td className="col-md-3">{item.service_id}</td>
                        <td className="col-md-3">{item.budgetCost}</td>
                        <td className="col-md-3">{item.actusalCost}</td>
                        <td className="col-md-2">{item.paidAmount}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            )
        });
    
        // 



    const [serviceInput, setSelectedService] = useState({
        service_id: '',
    });

    const handleInput = (e) => {
        e.persist();
        setSelectedService({...serviceInput, [e.target.name]:e.target.value});
    }

    const [service, setService] = useState([]);

    useEffect(() => {
      
        axios.get('/api/get-service').then(res=>{
            if(res.data.status === 200) 
            {
                setService(res.data.service);
            }
        });
    }, []);

    // 

    const [searchservice, setSearchService] = useState([]);

    const searchService = (e, service_id) => {
        axios.get(`/api/search-service/${service_id}`).then(res=>{
            if(res.data.status === 200) 
            {
                setSearchService(res.data.service);
            }
        });
    }

    var showSearchList = '';
    showSearchList = searchservice.map( (item, idx) => {
        return (
            <div className="col-md-4" key={idx}>
                <div className="card">
                    <div className="row">
                        <div className="card">
                             <Link to={`/categoryToUser/${item.serviceName}`}>
                                <img src={`http://localhost:8000/${item.image}`} className="w-100" alt={item.name}></img>
                             </Link>
                            <div className="card-body">
                                <h5 className="text-center">{item.serviceName}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    });

    // 

       // 

       const [searchLocationList, setSearchServiceLocation] = useState([]);

       const searchLocation = (e, location_id) => {
           axios.get(`/api/search-location/${location_id}`).then(res=>{
               if(res.data.status === 200) 
               {
                   console.log(res.data.service)
                setSearchServiceLocation(res.data.service);
               }
           });
       }
   
       var showSearchLocationList = '';
       showSearchLocationList = searchLocationList.map( (item, idx) => {
           return (
               <div className="col-md-4" key={idx}>
                   <div className="card">
                       <div className="row">
                           <div className="card">
                                <Link to={`/categoryToUser/${item.serviceName}`}>
                                   <img src={`http://localhost:8000/${item.image}`} className="w-100" alt={item.name}></img>
                                </Link>
                               <div className="card-body">
                                   <h5 className="text-center">{item.serviceName} - {item.location}</h5>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
           )
       });
   
       // 

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

    // 


    return(
        <body id="page-top">
   

        <section>
            
                <div className="row">
                        <div className="row">
                            {showCatList}
                        </div>
                </div>
        </section>

   

    </body>
    )
}
export default Dashboard;