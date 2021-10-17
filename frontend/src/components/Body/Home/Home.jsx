import React, { useEffect, useState } from "react";
import Product from "../Product/Products";


function Home() {


    const [products, setProducts] = useState([]);

    useEffect(() => {
        (async () => {
            const data = await fetch("/home");
            const prods = await data.json();
            setProducts(prods);
        })();
    }, []);

    return <div>
            <Product products={products}/>

    </div>
};

export default Home;