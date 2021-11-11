import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Profile from "./Profile";
import MyOrders from './MyOrders';

function Account() {
    let { url } = useRouteMatch();
    return <div>
        <Switch>
            <Route path={url + "/profile"} exact >
                <Profile/>
            </Route>
            <Route path={url + "/myorders"} exact >
                <MyOrders/>
            </Route>

        </Switch>
    </div>
};

export default Account;