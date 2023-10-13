const path = require('path');
const api = require('./api.js');

// Détermine le répertoire de base
const basedir = path.normalize(path.dirname(__dirname));
console.debug(`Base directory: ${basedir}`);

express = require('express');
const app = express()

app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

api_1 = require("./api.js");
const session = require("express-session");
const cors = require('cors');
app.use(cors());

app.use(session({
    secret: "technoweb rocks",
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000*60*60*24} //un jour
}));

// base de donnees
var Datastore = require('nedb');
db = {};
db.users = new Datastore({filename: "users.db", autoload: true});
db.messages = new Datastore({filename: "messages.db", autoload: true});
app.use('/api', api.default(db));


// Démarre le serveur
app.on('close', () => {
});
exports.default = app;

