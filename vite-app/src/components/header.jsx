import React from 'react';
import '../styles/header.css'; // CSS styles moved to an external file or styled-components

export default function HeaderComp() {

    const categories = [
        'Apple',
        'Datorer & Tillbehör',
        'Datorkomponenter',
        'Hem & Hälsa',
        'Leksaker & Hobby',
        'Mobil',
        'Nätverk & Smarta Hem',
        'Spel',
        'TV, Ljud & Bild'
    ]
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
                    {categories.map((category, index) => (<li className="category-item" key={index}><a className="category-link" href={`/categories/${category}`}>{category}</a></li>))}
                </ul>
            </nav>
        </header>
    );
}
