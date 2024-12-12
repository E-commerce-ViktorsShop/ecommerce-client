import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './App.css'
import HomePage from "./pages/home.jsx";
import ProductPage from "./pages/product.jsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}></Route>
                <Route path="/product/:id" element={<ProductPage/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
