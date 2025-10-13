// Import functions from controllers
const { connectDb } = require('./utils.js');
const { sendMessages, saveMessage } = require('./controllers/messagesController.js');
const UserController = require('./controllers/usersController.js');
const ReservationsController = require('./controllers/reservationsController.js');
const { createTransaction, updateItemOwner } = require('./controllers/transactionsController.js');

// Import modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
// Load dotenv module to access .env with: process.env.VARIABLENAME
require('dotenv').config();


const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


// Load the server
const app = express();
// Define listened port
const port = 3000;


app.use(
    session({
        secret: 'yourSecretKey', // Replace with a unique key
        resave: false,           // Avoid resaving unchanged sessions
        saveUninitialized: false, // Only save sessions with initialized data
        cookie: {
            maxAge: 60000,         // 1-minute session expiry
        },
    })
);


// Use modules on the server
// app.use(cors());
const allowedOrigins = ['http://localhost:5173', 'https://tonsite.com'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());


// Connect to database
const connectionDb = connectDb(
    mysql,
    process.env.DB_HOST,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    process.env.DB_NAME
);

// temporary internal data
let data =
[
    'test 1',
    'test 2'
];

const users = [{ id: 1, username: 'admin', password: 'password' }];




passport.use(
  new LocalStrategy((username, password, done) => {
    console.log('auth test');
    const user = users.find((u) => u.username === username);
    if (!user) return done(null, false, { message: 'User not found' });
    if (user.password !== password) return done(null, false, { message: 'Invalid password' });
    return done(null, user);
  })
);


passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
    const user = users.find((u) => u.id === id);
    done(null, user);
});





// Create routes
app.get('/messages', (req,res) => {
    sendMessages(req,res,data);
});

app.post('/messages', (req,res) => {
    data = saveMessage(req,res,data);
});

app.get('/users', (req,res) => {
    UserController.getAllUsers(req,res,connectionDb);
});

app.get('/userbyname', (req,res) => {
    UserController.getUserByName(req,res,connectionDb);
});

app.put('/transactions', (req,res) => {
    updateItemOwner(req,res,connectionDb);
});

app.post('/transactions', (req,res) => {
    createTransaction(req,res,connectionDb);
});


app.post(
    '/login',
    passport.authenticate('local', { successRedirect: '/success', failureRedirect: '/failure' }),
    function(req, res) {
    console.log('ça marche !!!!!!');
    // res.redirect('/~' + req.user.username);
    }
);

app.get('/success', (req, res) => {
    res.send('Connexion réussie.');
});

app.get('/failure', (req, res) => {
    res.send('Échec de connexion.');
});


// Listen on defined port
app.listen(port, () => console.log('app running'));