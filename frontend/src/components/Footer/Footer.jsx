import React from "react";
import { Link } from "react-router-dom";
import "./footer.css"

function Footer() {
    return <div className="Footer navbar-dark ">

        <div className="container">
            <footer className="py-1 ">
                <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                    {/* <Link to="/about" className="nav-item nav-link px-2" >About</Link> */}
                    <Link to="/home" className="nav-item nav-link px-2 ">Home</Link>
                    <Link to="/seller" className="nav-item nav-link px-2 "> Sell On ShopIt</Link>
                    {/* <Link to="/contactUs" className="nav-item nav-link px-2">contact us</Link> */}
                </ul>
                <p className="text-center text-muted">&copy; 2021 Company, Inc</p>
            </footer>
        </div>
    </div>
};

export default Footer;