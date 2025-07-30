const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const cors = require('cors')
const { ExpressPeerServer } = require('peer');

const UserManager = require('./userManager');

const app = express();

app.use(cors)
const port = 3443;

const server = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'ssl', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'ssl', 'cert.pem')),
}, app);

const peerServer = ExpressPeerServer(server, {
    path: '/',     // endpoint will be https://your-domain:3443/peerjs
    debug: true,    // turn off in production
});

app.use('/peerjs', peerServer); // mount under /peerjs

app.get('/', (req, res) => {
    res.send('Hello World! server');
});

server.listen(port, () => {
    console.log(`server running at https://localhost:${port}`);
});
