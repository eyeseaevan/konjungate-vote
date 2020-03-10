require('dotenv').config()

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');
const Rpc = require('bitcoin-rpc-async');

const rpc = new Rpc(`http://${process.env.RPC_USER}:${process.env.RPC_PASS}@${process.env.RPC_ADDRESS}:${process.env.RPC_PORT}`);

let app = express();
app.use(cors());
app.options('http://127.0.0.1', cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Function to handle the root path
app.get('/api/msg', async function(req, res) {

    // Access the provided 'page' and 'limt' query parameters
    let address = req.query.address;
    let msg = req.query.message;
    let signature = req.query.signature;

    // Return the articles to the rendering engine
    console.log(`Vote validation request recieved, validating with daemon at: http://${process.env.RPC_USER}:${process.env.RPC_PASS}@${process.env.RPC_ADDRESS}:${process.env.RPC_PORT}`);
    rpc.run('verifymessage', [address, signature, msg]).then(data => res.json(data.result));
});

// Function to handle the root path
app.get('/api/mn', async function(req, res) {

    // Access the provided 'page' and 'limt' query parameters
    let address = req.query.address;

    // Return the articles to the rendering engine
    console.log(`Masternode validation request recieved, validating with daemon at: http://${process.env.RPC_USER}:${process.env.RPC_PASS}@${process.env.RPC_ADDRESS}:${process.env.RPC_PORT}`);
    rpc.run('masternodelist', ['full', address]).then(data => res.json(((Object.values(data.result)).toString()).includes(address)));
});

let server = app.listen(3333, function() {
    console.log('Server is listening on port 3333')
});
