# WebBack STRASSPOLY
## Installation des Packages:
-------------
`npm init`

`npm install -g sequelize-cli`

`npm install express ejs`

`npm install --save sequelize`

`npm install --save pg pg-hstore`

`npm install cors`

`npm install body-parser`


## Pour la création de la bd:

`sequelize model:create --attributes "login:string name:string password:string email:string piece:integer avatar:string" --name users`

`sequelize db:migrate`


