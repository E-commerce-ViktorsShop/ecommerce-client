import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './App.css'
import HomePage from "./pages/home.jsx";

import FooterComp from "./components/footer.jsx";
import ProductPage from "./pages/product.jsx";
import CategoryPage from "./pages/category.jsx";

// Components
import HeaderComp from "./components/header.jsx";

function App() {

    return (
        <BrowserRouter>
            <HeaderComp/>
            <Routes>
                <Route path="/" element={<HomePage/>}></Route>
                <Route path="/product/:id" element={<ProductPage/>}></Route>
                <Route path="/categories/:name" element={<CategoryPage/>}></Route>
            </Routes>
            <FooterComp/>
        </BrowserRouter>

    )
}

export default App
