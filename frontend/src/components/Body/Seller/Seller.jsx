import React, { useContext } from 'react';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import CreateProduct from './CreateProduct';
import "./seller.css";
import LoginContext from '../../Context';
import SellerProducts from './SellerProducts';
import SellerSales from './SellerSales';

function Seller() {

    const { loginStatus } = useContext(LoginContext);
    let { url } = useRouteMatch();

    // if (!loginStatus) {
    //     history.push("/login");
    // }

    return <div className="pb-3 pt-1">
        <div className="custom-container m-auto mt-4 d-flex">
            {
                loginStatus ? <>
                    <Link to={`${url}/createproduct`}>
                        <p className="h4">Create New Product </p>
                    </Link>
                    <Link to={`${url}/sellerproduct`}>
                        <p className="h4">View Your Product </p>
                    </Link>
                    <Link to={`${url}/sellersales`}>
                        <p className="h4">View Your Sales </p>
                    </Link>
                </> :
                    <>
                        <div><p className="h2">Log In First !!!</p></div>
                    </>
            }

        </div>

        <Switch>
            <Route path={`${url}/createproduct`} exact> <CreateProduct /></Route>
            <Route path={`${url}/sellerproduct`} exact> <SellerProducts /></Route>
            <Route path={`${url}/sellersales`} exact> <SellerSales /></Route>

        </Switch>
    </div>
};

export default Seller;