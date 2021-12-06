import React, { useEffect, useState, useContext } from 'react';
import { useParams, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import "./product.css"
import loginContext from "../../Context"

function ProductPage() {
    let { value } = useParams();
    const [product, setProduct] = useState();
    const { setCartItem } = useContext(loginContext);
    // console.log(cart);
    
    useEffect(() => {
        (async () => {
            let prod = await fetch("/products/id/" + value);
            let data = await prod.json();
            setProduct(data);
        })();
    }, [value])

    const { url } = useRouteMatch();

    function addToCart(event) {
        if (product.stock > 0) {
            let cartItem = {
                productId:value,
                name: product.name,
                price: product.price,
                image: product.images[0],
                quantity: 1
            }
            setCartItem(cartItem);

        }
    }

    return (product ? <div className="container-fluid">
        <div className="row">
            <div className="col-sm-10 col-md-5">

                <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {product && product.images.map((img, index) => {
                            return <div className={index === 0 ? "active carousel-item" : "carousel-item"} key={index}>
                                <img src={img} className="d-block " alt="..." />
                            </div>
                        })}
                    </div>

                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

            </div>
            <div className="col-sm-12 col-md-6 container-fluid">
                <h2>{product.name} </h2>
                <hr />
                <div className="container-fluid mt-4">
                    <h3>Price: {product.price}</h3>
                    <hr />
                    <div className="container-fluid mt-4">
                        <div>
                            <h5>In Stock: {product.stock}</h5>
                            <p>
                                {product.desc.substring(0, 200)}...
                            </p>
                        </div>
                        <div className="d-grid gap-2">
                            <Link to={product.stock > 0 && url + "/buy"}>
                                <button className="w-100 btn btn-success " type="button">Buy Now</button>
                            </Link>

                            <button className="w-100 btn btn-outline-success" type="button" onClick={addToCart}>Add to Cart</button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
        <hr />
        <div className="row mt-4">
            <p>{product.desc}</p>
        </div>
    </div>
        : <div></div>);
};

export default ProductPage;