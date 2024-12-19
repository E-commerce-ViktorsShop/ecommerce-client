import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { categories } from '../utils/static.js';

export default function FooterComp() {
    return (
        <footer className="bg-primary text-light d-flex flex-column align-items-center" style={{ minHeight: '395px' }}>
            {/* Footer Navigation Links */}
            <div className="container d-flex justify-content-center align-items-center flex-grow-1">
                <div className="row">
                    <div className="col text-center">
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
                </div>
            </div>

            {/* Contact Section */}
            <div className="bg-light text-dark py-3 w-100">
                <div className="container">
                    <div className="row text-center">
                        <div className="col">
                            <div>0705788520</div>
                        </div>
                        <div className="col">
                            <div>Viktors Väg 123</div>
                        </div>
                        <div className="col">
                            <a
                                href="mailto:viktor.linne@gmail.com"
                                className="text-dark text-decoration-none"
                            >
                                viktorshop@gmail.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Rights Reserved Section */}
            <div className="bg-dark text-light py-2 w-100">
                <div className="container text-center">
                    <p className="mb-0">© 2024 ViktorShop. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}
