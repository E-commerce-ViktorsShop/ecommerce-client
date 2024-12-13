import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";

async function fetchProducts() {
    try {
        const response = await fetch('https://ecommerce-api-sandy.vercel.app/products/?limit=10')
        if (!response.ok) {
            console.error("Error fetching data")
            return;
        }

        return await response.json();

    } catch (error) {
        console.error(error)
        return;
    }


}

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