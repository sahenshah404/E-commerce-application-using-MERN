import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import loginContext from '../Context';

function Cart() {
    let { cart,setCart,setCartItem } = useContext(loginContext);

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
                    productId:cart[index].productId,
                    name: cart[index].name,
                    price: cart[index].price*count,
                    image: cart[index].image,
                    quantity: count
                }
                newCart.push(newItem);
                break;
            };
        };
        count = 0;
    });
    
    function reduce(params) {
        let index=0;
        while(true){
            if(cart[index].productId===params){
                let modifiedCart = [...cart];
                modifiedCart.splice(index,1);
                setCart(modifiedCart);
                break;
            }
            index=index+1;
        }
    };

    function add(params) {
        let index=0;
        while(true){
            if(cart[index].productId===params){
                let newItem = {...cart[index]};
                setCartItem(newItem);
                break;
            }
            index=index+1;
        }
    };

    let totalAmount = 0;
    for (let index = 0; index < cart.length; index++) {
        totalAmount=totalAmount+cart[index].price;        
    }

    function buyAll(params) {
        
    }

    return <div>
        {<div className="input-form m-auto">
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
                            <p className="h4">quantity: {element.quantity}</p>
                            <p className="h4">Price: {element.price}</p>
                            <div className="row">
                                <button className="btn btn-outline-danger col-6" type="button" onClick={()=>reduce(element.productId)}>Delete</button>
                                <button className="btn btn-outline-success col-6" type="button" onClick={()=>add(element.productId)}>Add</button>
                            </div>
                        </div>
                    </div>

                })
                }

            </div>
            <div className="d-grid gap-2">
                {cart.length>0 ?<>
                <p className="h3">Total Amount =  {totalAmount}</p>
                <button className="btn btn-success btn-lg" type="button" onClick={buyAll}>Buy All</button></>:
                <p className="h1">Cart is Empty</p>
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
export default Cart;