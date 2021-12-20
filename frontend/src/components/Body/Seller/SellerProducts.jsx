import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import LoginContext from "../../Context"

function SellerProducts() {

    const { loginStatus } = useContext(LoginContext);
    const [orderData, setOrderData] = useState();

    useEffect(() => {
        (async () => {
            const response = await fetch("/products/myproducts");
            const data = await response.json();
            setOrderData(data);

        })()
    }, []);

    function editStock(params) {
        params.preventDefault();
        const newStock = params.target.newStock.value;
        const prodId = params.target.productId.value;
        (async () => {
            const response = await fetch("/products/editStock/" + prodId + "/" + newStock);
            if (response.status === 401) {
                alert("You are Unauthorized to make this requesst");
            } else {
                const response = await fetch("/products/myproducts");
                const data = await response.json();
                setOrderData(data);
            }
        })()
    }

    return <div>
        {loginStatus === false ? <div className="custom-container m-auto">
            <p className="h3">You need to sign in First</p>
            <Link to="/login">
                <button className="btn btn-outline-dark"> Go To Login Page</button>
            </Link>
        </div> : orderData && <div className="custom-container m-auto">
            <div className="container-fluid">
                {orderData.map((element, index) => {
                    return <div className="row" key={index}>
                        <div className="col-md-3">
                            <Link to={"/product/id/" + element.productId}>
                                <img src={element.image} alt="product" />
                            </Link>
                        </div>
                        <div className="col-md-9 flex-column">
                            <p className="h4">Product Name: {element.name}</p>
                            <p className="h4">Price: {element.price}</p>
                            <p className="h4">quantity: {element.quantity}</p>
                            <form className="d-flex search" onSubmit={editStock}>
                                <input type="hidden" name="productId" defaultValue={element.productId} />
                                <input className="form-control me-2" defaultValue={element.quantity} name="newStock" type="number" placeholder="New Stock" aria-label="new Stock" />
                                <button className="btn btn-success w-100" type="submit">Edit Stock</button>
                            </form>
                        </div>
                    </div>

                })
                }

            </div>
        </div>

        }

    </div>
};


export default SellerProducts;