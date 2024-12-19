import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import {categories} from '../utils/static.js';

export default function FooterComp() {
    return (
        <footer className="bg-primary text-light d-flex flex-column align-items-center"
                style={{
                    minHeight: 'fit-content',
                    fontFamily: '"Comic Sans MS", cursive, sans-serif',
                }}>

            <div className="container d-flex flex-column flex-grow-1">
                <div className="row align-items-center">

                    {/* Page logo to the right */}
                    <div className="col text-center">
                        <img src="/logos/Viktorsshop-comic.png" alt="logo for page"/>
                    </div>

                    {/* Link list in the center */}
                    <div className="col text-center"
                         style={{paddingTop: '1rem',
                                 paddingBottom: '1rem'}}>
                        <ul className="list-unstyled m-0 p-0">
                            {categories.map((category) => (
                                <li key={category} className="py-1">
                                    <a
                                        href={`/categories/${category}`}
                                        className="text-light text-decoration-none"

                                    >
                                        {category}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Kontakt Section */}
                    <div className="col text-center">
                        <h5>Kontakt</h5>
                        <a
                            href="mailto:viktorshop@gmail.com"
                            className="text-light text-decoration-none"

                        >
                            viktorshop@gmail.com
                        </a>
                        <p className="mb-0">
                            0705788520
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-dark text-light py-2 w-100">
                <div className="container text-center">
                    <p className="mb-0">© 2024 ViktorShop. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}
