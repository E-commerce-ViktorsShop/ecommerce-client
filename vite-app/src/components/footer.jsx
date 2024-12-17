import React from 'react';
import '../styles/footer.css'; // External CSS file for styles
import {categories} from "../utils/static.js";
export default function FooterComp() {
    return (
        <footer className="footer">
            {/* Footer Navigation Links */}
            <div className="footer-links">
                <ul>
                    {categories.map(category => (
                        <li key={category}><a href={`/categories/${category}`} className={"list-links"}>{category}</a></li>
                    ))}
                </ul>
            </div>

            {/* Contact Section */}
            <div className="contact">
                <div className="contact-item" id="contact-1">0705788520</div>
                <div className="contact-item" id="contact-2">Viktors Väg 123</div>
                <div className="contact-item" id="contact-3">
                    <a href="mailto:viktor.linne@gmail.com">viktorshop@gmail.com</a>
                </div>
            </div>

            {/* Rights Reserved Section */}
            <div className="rights-reserved">
                <p>© 2024 ViktorShop. All Rights Reserved.</p>
            </div>
        </footer>
    );
}