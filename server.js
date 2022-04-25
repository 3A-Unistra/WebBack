require('dotenv').config(); // pour accéder au .env

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var apiRouter = require('./apiRouter').router;

var server = express();
server.use(cors());
server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.json());

server.get('/',function(req,res) {
    res.setHeader('Content-Type','text/html');
    res.status(200).send('<h1> lien du serveur</h1>');
});

server.use('/api/', apiRouter);

server.listen(process.env.API_PORT, function() {
    console.log('serveur a démarré');
});