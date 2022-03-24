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