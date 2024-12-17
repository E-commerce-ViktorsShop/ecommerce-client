import React, {useState} from 'react';
import '../styles/header.css'; // CSS styles moved to an external file or styled-components
import {useNavigate} from "react-router-dom";
import {categories} from "../utils/static.js";
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
            {/* Search Bar Section */}
            <form className="searchbar-wrapper" onSubmit={submitHandler}>
                <input
                    type="search"
                    placeholder="Sök..."
                    aria-label="sök"
                    className="search-input"
                    onChange={changeHandler}
                />
            </form>

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
