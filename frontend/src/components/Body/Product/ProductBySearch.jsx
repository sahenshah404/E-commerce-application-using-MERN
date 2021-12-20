import React,{useState,useEffect} from 'react';
import Product from './Products';
import { useParams } from 'react-router';

function ProductBySearch() {
    const [products, setProducts] = useState([]);
    let {value}= useParams();

    useEffect(() => {
        (async () => {
            const data = await fetch("/products/search/"+value);
            const prods = await data.json();
            console.log(prods);
            setProducts(prods);
        })();
    },[value]);


    return <div>
        <Product products={products} />
    </div>
};

export default ProductBySearch;