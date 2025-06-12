const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const cors = require('cors')
const socketio = require('socket.io');

const app = express();
app.use(cors)
const port = 3443;


const server = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'ssl', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'ssl', 'cert.pem')),
}, app);


const io = socketio(server);

io.on('connection', (socket) => {
    console.log(socket.id);
})

app.get('/', (req, res) => {
    res.send('Hello World! server');
});

server.listen(port, () => {
    console.log(`server running at https://localhost:${port}`);
});
