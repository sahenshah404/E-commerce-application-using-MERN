import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function SellerSales() {

    const [cart, setCart] = useState([]);
    useEffect(() => {
        (async () => {
            const response = await fetch("/products/mysales");
            const data = await response.json();
            setCart(data);

        })()
    }, []);


    let newCart = [];
    let uniqueItem = [];

    cart.forEach(element => {
        if (!uniqueItem.includes(element.productId)) {
            uniqueItem.push(element.productId);
        };
    });

    uniqueItem.forEach(element => {
        let count = 0;
        cart.forEach(item => {
            if (item.productId === element) {
                count = count + 1;
            };
        });

        for (let index = 0; index < cart.length; index++) {
            if (cart[index].productId === element) {
                let newItem = {
                    productId: cart[index].productId,
                    name: cart[index].name,
                    price: cart[index].price * count,
                    image: cart[index].image,
                    quantity: count
                }
                newCart.push(newItem);
                break;
            };
        };
        count = 0;
    });



    let totalAmount = 0;
    for (let index = 0; index < cart.length; index++) {
        totalAmount = totalAmount + cart[index].price;
    }


    return <div>
        {<div className="custom-container m-auto">
            <div className="container-fluid">
                {newCart.map(element => {
                    return <div className="row" key={element.productId}>
                        <div className="col-md-3">
                            <Link to={"/product/id/" + element.productId}>
                                <img src={element.image} alt="product" />
                            </Link>
                        </div>
                        <div className="col-md-9 flex-column">
                            <p className="h4">Product Name: {element.name}</p>
                            <p className="h4">quantity Sold: {element.quantity}</p>
                            <p className="h4">Price: {element.price}</p>

                        </div>
                    </div>

                })
                }

            </div>
            <div className="d-grid gap-2">
                {cart.length > 0 ? <>
                    <p className="h3">Total Sale =  {totalAmount}</p>

                </> :
                    <p className="h1">Sales List is Empty</p>
                }
            </div>
        </div>

        }


    </div>
};

// {
//     cart.map((item) => {
//         return item.name
//     })
// }
export default SellerSales;