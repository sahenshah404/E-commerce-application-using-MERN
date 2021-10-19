import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import "./product.css"

function ProductPage() {
    let { value } = useParams();
    const [product, setProduct] = useState();

    useEffect(() => {
        (async () => {
            let prod = await fetch("/products/id/" + value);
            let data = await prod.json();
            setProduct(data);
        })();
    }, [value])

    return (product ? <div className="container-fluid">
        <div class="row">
            <div class="col-sm-10 col-md-5">

                <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        {product && product.images.map((img, index) => {
                            return <div class={index === 0 ? "active carousel-item" : "carousel-item"} key={index}>
                                <img src={img} class="d-block " alt="..." />
                            </div>
                        })}
                    </div>

                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>

            </div>
            <div class="col-sm-12 col-md-6 container-fluid">
                <h2>{product.name} </h2>
                <hr />
                <div class="container-fluid mt-4">
                    <h3>Price: {product.price}</h3>
                    <hr />
                    <div class="container-fluid mt-4">
                        <div>
                            <h5>In Stock: {product.stock}</h5>
                            <p>
                                {product.desc.substring(0,200)}...
                            </p>
                        </div>
                        <div class="d-grid gap-2">
                            <button class="btn btn-success" type="button">Buy Now</button>
                            <button class="btn btn-outline-success" type="button">Add to Cart</button>
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