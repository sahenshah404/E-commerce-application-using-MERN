import React,{useState,useEffect} from 'react';
import Product from './Products';
import { useParams } from 'react-router';

function ProductByCategories() {
    const [products, setProducts] = useState([]);
    let {value}= useParams();

    useEffect(() => {
        (async () => {
            const data = await fetch("/products/cat/"+value);
            const prods = await data.json();
            setProducts(prods);
        })();
    },[value]);


    return <div>
        <Product products={products} />
    </div>
};

export default ProductByCategories;