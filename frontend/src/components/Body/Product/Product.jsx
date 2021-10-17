import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import ProductPage from './ProductPage';
import ProductByCategories from './ProductsByCategory';

function Product() {
    let { url } = useRouteMatch();

    return <div className="container">
        <Switch>
            <Route path={url+"/id/:value"}> <ProductPage />  </Route>
            <Route path={url+"/type/:value"}>  <ProductByCategories /> </Route>
        </Switch>
    </div>
};

export default Product;