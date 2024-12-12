import React from 'react';
import '../styles/footer.css'; // External CSS file for styles

export default function FooterComp() {
    return (
        <footer className="footer">
            {/* Footer Navigation Links */}
            <div className="footer-links">
                <ul>
                    <li><a href="#" className="list-links">Mössor</a></li>
                    <li><a href="#" className="list-links">Tröjor</a></li>
                    <li><a href="#" className="list-links">Byxor</a></li>
                    <li><a href="#" className="list-links">Strumpor</a></li>
                    <li><a href="#" className="list-links">Skor</a></li>
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