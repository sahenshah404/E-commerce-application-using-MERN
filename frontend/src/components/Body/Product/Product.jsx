import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import ProductPage from './ProductPage';
import ProductByCategories from './ProductsByCategory';
import ProductBuy from './ProductBuy';
import ProductBySearch from './ProductBySearch';

function Product() {
    let { url } = useRouteMatch();

    return <div className="container">
        <Switch>
            <Route path={url+"/id/:value/buy"}>  <ProductBuy /> </Route>
            <Route path={url+"/id/:value"}> <ProductPage />  </Route>
            <Route path={url+"/type/:value"}>  <ProductByCategories /> </Route>
            <Route path={url+"/search/:value"}>  <ProductBySearch /> </Route>
        </Switch>
    </div>
};

export default Product;