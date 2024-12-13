import React from 'react';
import '../styles/ProductComp.css'; // External CSS file for styles

export default function ProductComp({ product}) {

    return(
        <>
            <li className="product">
                <p>{product.name}</p>
                <p>{product.description}</p>
                <img className="image" src={product.image+"?trim&w=500"} alt="" />
            </li>
        </>
    )
}
