import React from "react";
import Home from "./Home/Home";
import Seller from "./Seller/Seller";
import Product from "./Product/Product";
import Login from "./Login";

import {
    Route,
    Switch
} from "react-router-dom";

function Body() {

    return <div style={{backgroundColor:"#C4EDDE", minHeight:"90vh"}}>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/home" exact component={Home} />
            <Route path="/seller" > <Seller /> </Route>
            <Route path="/product" > <Product /> </Route>
            <Route path="/login" > <Login /> </Route>

        </Switch>
    </div>
};

export default Body;