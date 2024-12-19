import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './App.css';
import HomePage from './pages/home.jsx';

import FooterComp from './components/footer.jsx';
import ProductPage from './pages/product.jsx';
import CategoryPage from './pages/category.jsx';

// Components
import HeaderComp from './components/header.jsx';
import ScrollToTop from './utils/scrollToTop.jsx';
import PageNotFound from "./pages/404.jsx";

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop/>
            <HeaderComp/>
            <Routes>
                <Route path='/' element={<HomePage/>}></Route>
                <Route path='/product/:id' element={<ProductPage/>}></Route>
                <Route path='/categories/:name' element={<CategoryPage/>}></Route>
                <Route path='*' element={<PageNotFound/>}></Route>
            </Routes>
            <FooterComp/>
        </BrowserRouter>
    );
}

export default App;
