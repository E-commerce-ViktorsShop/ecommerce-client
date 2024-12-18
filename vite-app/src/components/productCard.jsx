import React, {useState} from 'react';
import '../styles/ProductComp.css';

import LoadingSpinner from "./loaders/spinner.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Link } from 'react-router-dom';



export default function ProductComp({product}) {
    const [loading, setLoading] = useState(true);
    return (
        <>
            <Link to={`/product/${product._id}`} state={{product}} style={{textDecoration: 'none'}}>
                <li className='product'>
                    <div
                        className='d-flex flex-column justify-content-between align-items-center p-2'
                        style={{height: '100%'}}
                    >
                        <p className="fw-bold" style={{
                            height: '50px',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}>
                            {product.name}
                        </p>
                        <div className="d-flex align-items-center justify-content-center" style={{height: '64px'}}>
                            <p className="text-truncate" style={{
                                whiteSpace: "normal",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: "2"
                            }}>
                                {product.subTitle}
                            </p>
                        </div>
                        <div className={"image-container w-100 overflow-hidden"} style={{height: "160px"}}>
                            {
                                loading && <LoadingSpinner/>
                            }
                            <img className='image pb-2 w-100 h-100 object-fit-contain'
                                 style={{display: loading ? 'none' : 'block'}}
                                 onLoad={() => setLoading(false)} src={product.thumbNail}
                                 alt={`image for ${product.name}`}/>
                        </div>
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
    )
        ;
}
