import React from 'react';
import { Link } from 'react-router-dom';
import "./product.css"

function Products({ products }) {
    return <div className="row p-3 container-fluid" >
        {
            products.map(prods => {
                return <div key={prods._id} className="product col-lg-3 col-md-4 col-sm-6 mt-4 mb-4 ">
                    <Link to={"/product/id/" + prods._id} style={{ textDecoration: 'none' }}>
                        {/* card top-img */}
                        <img className="img" src={prods.images[0]} alt={prods.images[0]} />
                        <div className="card-body nav-link">
                            <h5 className="card-title muted">{prods.name.substring(0,45)} <sub className="text-muted"> View More</sub></h5>
                            <p className="card-text">Price:{prods.price}</p>
                            {/* <p className="card-text"><small className="text-muted">CLick to view this Product</small></p> */}
                        </div>
                    </Link>
                </div>
            })
        }


    </div>
};

export default Products;

// {
//     products.map(prods => {
//         return <div key={prods._id} >
//             <img src={prods.images[0]} alt={prods.images[0]} />
//             <p>{prods.name}</p>
//             <p>{prods.price}</p>
//             <p>{prods.desc}</p>
//             <p>{prods.stock}</p>
//             <p>{prods.category}</p>
//             {/* {prods.images.map(img => {
//             return <img key={img} src={img} alt={img} />
//         })} */}
//             <br />
//         </div>
//     })
// }