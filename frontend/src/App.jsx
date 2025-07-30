import ReactDOM from "react-dom/client";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import ChatPage from './pages/ChatPage';
import TransferPage from './pages/TransferPage';



function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/chat" element={<ChatPage />} />
                    <Route path="/transfer" element={<TransferPage />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
