import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import LoginContext from '../Context';
import Input from './input';

function CartBuy() {

    const history = useHistory();
    const { loginStatus, cart, setCart } = useContext(LoginContext);
    let newCart = [];

    function goback() {
        history.go(-1)
    };
    function buying() {
        if (!loginStatus) {
            history.push("/login");
        } else {
            (async () => {
                for (let index = 0; index < cart.length; index++) {

                    const response = await fetch("/products/id/" + cart[index].productId + "/buy/bought")
                    if (response.status === 205) {
                        // newCart.splice(index, 1);
                        newCart.push(cart[index]);
                    }
                    if (index === cart.length - 1) {
                        await setCart(newCart);
                        history.push("/account/myorders");
                    }
                };

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

export default CartBuy;