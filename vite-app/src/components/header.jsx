import React, {useState} from 'react';
import '../styles/header.css'; // CSS styles moved to an external file or styled-components
import {useNavigate} from "react-router-dom";
import {categories} from "../utils/static.js";
import logo from "../assets/Viktorsshop-comic.png"
import {Link} from "react-router";

export default function HeaderComp() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');


    function submitHandler(event) {
        event.preventDefault()
        if (searchTerm.length > 0) {
            navigate(`/?searchTerm=${searchTerm}`);
        }
    }

    function changeHandler(event) {
        setSearchTerm(event.target.value);
    }

    return (
        <header className="topbar">
            <div className="header-container">
                <div className="logo-container">
                    <Link to={"/"}>
                        <img src={logo} alt={"Website Logo"}/>
                    </Link>
                </div>
                <form className="searchbar-wrapper" onSubmit={submitHandler}>
                    <input
                        type="search"
                        placeholder="Sök..."
                        aria-label="sök"
                        className="search-input"
                        onChange={changeHandler}
                    />
                </form>
                <div className={"cart-container"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white"
                         className="bi bi-cart-fill" viewBox="0 0 16 16">
                        <path
                            d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                    </svg>
                </div>
            </div>

            {/* Navigation Section */}
            <nav className="navigation">
                <ul className="category-list">
                    {categories.map((category, index) => (
                        <li className="category-item" key={index}><a className="category-link"
                                                                     href={`/categories/${category}`}>{category}</a>
                        </li>))}
                </ul>
            </nav>
        </header>
    );
}
