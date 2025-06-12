import { io } from 'socket.io-client'

const URL = 'https://localhost:3443'

export const socket = io(URL, {
    transports: ["websocket"]
});

