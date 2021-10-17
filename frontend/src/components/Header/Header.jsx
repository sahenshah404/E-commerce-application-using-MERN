import React from "react";
import "./header.css";

import {
    Link
} from "react-router-dom";

function Header() {

    return <nav className="navbar navbar-expand-md navbar-dark Header" style={{ backgroundColor: "#283C63" }}>
        <div className="container-fluid">

            <Link to="/home" className="navbar-brand brand-style">ShopIt</Link>

            <div className="S collapse navbar-collapse" id="navbarSupportedContent" >


                <form className="d-flex search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>


                <div className="navbar-nav">
                    <Link to="/account" className="nav-link "> Profile/login </Link>
                    <Link to="/home" className="nav-link "> Home </Link>


                    <div className="dropdown">
                        <button className="btn nav-link dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Category
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><Link to="/product/type/TopWear" className="dropdown-item nav-link" >Top Wear</Link></li>
                            <li><Link to="/product/type/BottomWear" className="dropdown-item nav-link" >Bottom Wear</Link></li>
                            <li><Link to="/product/type/FootWear" className="dropdown-item nav-link" >Foot Wear</Link></li>
                            <li><Link to="/product/type/Electronics" className="dropdown-item nav-link" >Electronics</Link></li>
                        </ul>
                    </div>


                    <Link to="/orders" className="nav-link"> Orders </Link>
                    <Link to="/cart" className="nav-link"> Cart </Link>

                </div>
            </div>


            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

        </div>
    </nav>
}

export default Header;