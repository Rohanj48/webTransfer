import ReactDOM from "react-dom/client";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { socket } from './Socket'
import Home from './pages/Home';
import ChatPage from './pages/ChatPage';
import TransferPage from './pages/TransferPage';



function App() {
    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        };
    }, []);


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
