import React from 'react';
import '../styles/header.css'; // CSS styles moved to an external file or styled-components

export default function HeaderComp() {
    return (
        <header className="topbar">
            {/* Search Bar Section */}
            <div className="searchbar-wrapper">
                <input
                    type="search"
                    placeholder="Sök..."
                    aria-label="sök"
                    className="search-input"
                />
            </div>

            {/* Navigation Section */}
            <nav className="navigation">
                <ul className="category-list">
                    <li><a href="#" className="category-link">Category</a></li>
                    <li><a href="#" className="category-link">Category</a></li>
                    <li><a href="#" className="category-link">Category</a></li>
                    <li><a href="#" className="category-link">Category</a></li>
                    <li><a href="#" className="category-link">Category</a></li>
                    <li><a href="#" className="category-link">Category</a></li>
                </ul>
            </nav>
        </header>
    );
}
