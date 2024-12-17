import React, {useEffect, useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {useNavigate} from "react-router-dom";
import {categories} from "../utils/static.js";
import logo from "../assets/Viktorsshop-comic.png";
import {Link} from "react-router-dom"; // make sure to use "react-router-dom" instead of "react-router"

export default function HeaderComp() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const cart = JSON.parse(localStorage.getItem('cart'));

    function submitHandler(event) {
        event.preventDefault();
        if (searchTerm.length > 0) {
            navigate(`/?searchTerm=${searchTerm}`);
        }
    }

    function changeHandler(event) {
        setSearchTerm(event.target.value);
    }


    return (
        <header className="sticky-top border-bottom bg-primary">
            <div className="container-fluid d-flex justify-content-between align-items-center py-3">
                {/* Logo Section */}
                <div className="logo-container " style={{width: "33%"}}>
                    <Link to="/">
                        <img src={logo} alt="Website Logo" width="250"/>
                    </Link>
                </div>

                {/* Search Section */}
                <form className="d-flex justify-content-center" style={{minWidth: "200px", width: "33%"}}
                      onSubmit={submitHandler}>
                    <input
                        type="search"
                        placeholder="Sök..."
                        aria-label="sök"
                        className="border"
                        style={{height: "40px", padding: "8px", borderRadius: "15px", width: "80%"}}
                        onChange={changeHandler}
                    />
                </form>

                {/* Cart Icon Section */}
                <div className="cart-container d-flex justify-content-end" style={{width: '33%'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white"
                         className="bi bi-cart-fill" viewBox="0 0 16 16"
                         style={{cursor: "pointer", marginRight: "30px"}}>
                        {/*width is set higher because bootstrap padding and margin right refused to work*/}
                        <path
                            d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                    </svg>
                    {cart?.length > 0 ?
                        <span className={"rounded-5 bg-secondary d-flex justify-content-center align-items-center p-2"}
                              style={{
                                  width: "20px",
                                  height: "20px",
                                  color: "white",
                                  textAlign: "center",
                                  position: "absolute",
                                  right: "60px",
                                  top: "50px",
                                  cursor: "pointer",
                              }}>{cart.length}
                    </span> : null}
                </div>
            </div>

            {/* Navigation Section */}
            <nav className="bg-secondary py-2">
                <div className="container">
                    <ul className="nav justify-content-evenly">
                        {categories.map((category, index) => (
                            <li className="nav-item" key={index}>
                                <a className="nav-link text-white" href={`/categories/${category}`}>
                                    {category}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </header>
    );
}
