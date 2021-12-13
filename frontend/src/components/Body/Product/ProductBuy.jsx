import React, { useContext } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import LoginContext from '../../Context';
import Input from '../input';

function ProductBuy() {

    const history = useHistory();
    let { url } = useRouteMatch();
    url=url.replace("product","products");
    const { loginStatus } = useContext(LoginContext);


    function goback() {
        history.go(-1)
    };
    function buying() {
        if (!loginStatus) {
            history.push("/login");
        } else {
            (async () => {
                const response = await fetch(url + "/bought")
                // const resp = await response.json();
                if(response.status===200){
                    history.push("/account/myorders");
                }
                else if(response.status===205){
                    alert("Stock Depleted for this product");
                }
            })()
        }
    }
    return <div>
        <div className="custom-container m-auto">
  
            <div className="container-fluid">
                <Input type="text" label="Enter you UPI" placeholder="Enter UPI" name="upi" required id="upi" />
                <button className="btn  btn-dark m-3" onClick={buying}>Proceed</button>
                <button className="btn  btn-outline-dark" onClick={goback}>cancel</button>
            </div>
        </div>
    </div>
};

export default ProductBuy;