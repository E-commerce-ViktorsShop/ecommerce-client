import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import {fetchProducts} from "../utils/functions.js";

export default function CategoryPage (){
    const [products, setProducts ] = useState([])
    useEffect(() => {
        async function fetchData()  {
            const data = await fetchProducts()
            setProducts(data)
            return data;
        }
       fetchData().then((data) => {
           console.log(data)
       })
    }, []);

    return (<>
        <main className="main">
            <ul id="product-list">
            {products.map((product) => (<li className="product" key={product._id}>
                <p>{product.name}</p>
                <p>{product.description}</p>
                <img className="image" src={product.image} alt="" />
            </li>))}
            </ul>
        </main>
    </>)
}