import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./custom.scss"
import App from './App.jsx'
import {CartProvider} from "./providers/CartProvider.jsx";

// Register Service Worker for image caching in built application
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/serviceWorker.js')
            .catch((err) => {
                console.error('Service Worker registration failed:', err);
            });
    });
}


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <CartProvider>
            <App/>
        </CartProvider>
    </StrictMode>,
)
