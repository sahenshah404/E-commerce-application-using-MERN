import React from 'react';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import CreateProduct from './CreateProduct';
import "./seller.css"

function Seller() {

    let { url } = useRouteMatch();

    return <div className="pb-3">

        <Link to={`${url}/createproduct`}>Create Your Product </Link>

        <Switch>
            <Route path={`${url}/createproduct`} exact> <CreateProduct /></Route>

        </Switch>
    </div>
};

export default Seller;