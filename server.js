/*
// console.log("youness");

const http = require('http');

// req: requette
// res: response
// req et res sont deux fonctions qui vont être appelé a chaque lancement du serveur
const server = http.createServer((req, res) => {
    res.end('Voilà la réponse du serveur !');
});

//3000 numero de port par defaut dans le devloppement
//on ajoute la var env au cas ou le port 3000 et indispo
server.listen(process.env.PORT || 3000);

*/
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
    res.status(200).send('<h1> bonjour sur le serveur</h1>');
});

server.use('/api/', apiRouter);


server.listen(3000, function() {
    console.log('serveur a démarré');
});