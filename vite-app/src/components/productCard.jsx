import React from 'react';
import '../styles/ProductComp.css';
import {Link} from 'react-router';

export default function ProductComp({product}) {
    return (
        <>
            <Link to={`/product/${product._id}`} state={{product}} style={{textDecoration: 'none'}}>
                <li className='product'>
                    <div
                        className='d-flex flex-column justify-content-between align-items-center p-2'
                        style={{height: '100%'}}
                    >
                        <div>
                            <p className='fw-bold'>{product.name}</p>
                            <p>{product.subTitle}</p>
                        </div>
                        <img className='image pb-2 w-50' src={product.thumbNail} alt=''/>
                    </div>

                    <div
                        className='w-100 d-flex align-items-center justify-content-center'
                        style={{backgroundColor: '#001524', height: '2.5rem'}}
                    >
                        <p className='fw-bold text-white m-0'>
                            {product.price.$numberDecimal} kr
                        </p>
                    </div>
                </li>
            </Link>
        </>
    );
}
