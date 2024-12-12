import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './App.css'
import HomePage from "./pages/home.jsx";

import FooterComp from "./components/footer.jsx";

function App() {

    return (
        <BrowserRouter>

            <Routes>
                <Route path="/" element={<HomePage/>}></Route>
            </Routes>
            <FooterComp/>
        </BrowserRouter>

    )
}

export default App
