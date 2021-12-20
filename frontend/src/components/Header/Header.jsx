import React, { useContext } from "react";
import "./header.css";
import { useHistory,Link } from 'react-router-dom';
import LoginContext from "../Context"

function Header() {

    const { loginStatus, setLoginStatus,cart } = useContext(LoginContext);
    const history = useHistory();

    function logout() {
        fetch("/account/logout").then(() => {
            setLoginStatus(false);
            history.push("/home");
        })
    };

    function searchText(params) {
        params.preventDefault();
        const searchValue = params.target.searchText.value;
        // console.log(searchValue);
        history.push("/product/search/"+searchValue);
    }

    return <nav className="navbar navbar-expand-md navbar-dark Header" style={{ backgroundColor: "#283C63" }}>
        <div className="container-fluid">

            <Link to="/home" className="navbar-brand brand-style">ShopIt</Link>

            <div className="S collapse navbar-collapse" id="navbarSupportedContent" >

                <form className="d-flex search" onSubmit={searchText}>
                    <input className="form-control me-2"  name="searchText" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>

                <div className="navbar-nav">
                    <Link to="/home" className="nav-link "> Home </Link>

                    {loginStatus === false && <Link to="/login" className="nav-link "> Login </Link>}
                    {loginStatus === true && <div className="dropdown">
                        <button className="btn nav-link dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                            Profile
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                            <li><Link to="/account/profile" className="dropdown-item nav-link" >My Profile</Link></li>
                            <li><button onClick={logout} className="dropdown-item nav-link" >Logout</button></li>
                        </ul>
                    </div>
                    }



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

                    <Link to="/account/myorders" className="nav-link"> Orders </Link>
                    <Link to="/cart" className="nav-link"> Cart {cart.length>0 && <p className="cartNo">{cart.length}</p>} </Link>

                </div>
            </div>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

        </div>
    </nav>
}

export default Header;