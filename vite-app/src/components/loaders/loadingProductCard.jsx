import React from 'react';
import '../../styles/ProductComp.css';
import {Link} from 'react-router';
import LoadingSpinner from "./spinner.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function ProductCompLoader() {
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
                            Laddar...
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
                                lorem / ipsum / dolor
                            </p>
                        </div>
                        <div className={"image-container w-100 overflow-hidden"} style={{height: "160px"}}>
                            <LoadingSpinner/>
                        </div>
                        <div className='w-100 d-flex align-items-center justify-content-center'
                             style={{backgroundColor: '#001524', height: '2.5rem'}}>
                            <p className='fw-bold text-white m-0'>XXX kr</p>
                        </div>
                    </div>
                </li>
            </Link>
        </>
    );
}
