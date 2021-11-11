import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import LoginContext from '../Context';

function MyOrders() {

    const { loginStatus } = useContext(LoginContext);
    const [orderData, setOrderData] = useState();

    useEffect(() => {
        (async () => {
            const response = await fetch("/products/myorders");
            const data = await response.json();
            setOrderData(data);

        })()
    }, []);


    return <div>
        {loginStatus === false ? <div className="input-form m-auto">
            <p className="h3">You need to sign in First</p>
            <Link to="/login">
                <button className="btn btn-outline-dark"> Go To Login Page</button>
            </Link>
        </div> : orderData && <div className="input-form m-auto">
            <div className="container-fluid">
                {orderData.map(element => {
                    return <div className="row" key={element.productId}>
                        <div className="col-md-3">
                           <Link to={"/product/id/"+element.productId}>
                           <img src={element.image} alt="product" />
                           </Link> 
                        </div>
                        <div className="col-md-9 flex-column">
                            <p className="h4">Product Name: {element.name}</p>
                            <p className="h4">Bought At: {element.time}</p>
                            <p className="h4">quantity: {element.quantity}</p>
                        </div>
                    </div>

                })
                }

            </div>
        </div>

        }

    </div>
};


export default MyOrders;