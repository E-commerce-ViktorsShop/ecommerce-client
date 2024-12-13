import React, {useEffect, useState} from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import {fetchProducts} from "../utils/functions.js";
import ProductComp from "../components/product.jsx";

export default function CategoryPage() {
    const [products, setProducts] = useState([])
    useEffect(() => {
        async function fetchData() {
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
                {products.map((product) => (<ProductComp key={product._id} product={product} />))}
            </ul>
        </main>
    </>)
}