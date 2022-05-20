import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div className="sb-sidenav-menu">
            <div className="nav">
                <div className="sb-sidenav-menu-heading">Core</div>

                <Link className="nav-link" to="/admin/dashboard">
                    <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                    Dashboard
                </Link>
                                
                <Link className="nav-link" to="/admin/addCategory">
                    <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                    Add Category
                </Link>

                <Link className="nav-link" to="/admin/viewCategory">
                    <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                    View Category
                </Link>
        
            </div>
        </div>
      
    </nav>
    );
} 
export default Sidebar;