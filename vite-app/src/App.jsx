import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './App.css'
import HomePage from "./pages/home.jsx";
// Components
import HeaderComp from "./components/header.jsx";

function App() {

    return (
        <BrowserRouter>
            <HeaderComp/>

            <Routes>
                <Route path="/" element={<HomePage/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
