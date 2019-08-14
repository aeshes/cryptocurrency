const express = require('express');
const parser = require('body-parser');
const Blockchain = require('../blockchain');
const P2PServer = require('./p2p-server');

const HTTP_PORT = process.env.HTTP_PORT || 3001;
const app = express();
const bc = new Blockchain();
const p2pServer = new P2PServer(bc);

app.use(parser.json());

app.get('/block', (req, res) => {
    res.json(bc.chain);
})

app.post('/mine', (req, res) => {
    const block = bc.addBlock(req.body.data);
    console.log(`New block added: ${block.toString()}`);
    res.redirect('/block');
});

app.listen(HTTP_PORT, () => {
    console.log(`Listening on port ${HTTP_PORT}`);
});

p2pServer.listen();