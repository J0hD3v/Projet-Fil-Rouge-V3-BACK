// Import functions from controllers
const { connectDb } = require('./utils.js');
const { sendMessages, saveMessage } = require('./controllers/messagesController.js');
const { getAllUsers, getUserByName } = require('./controllers/usersController.js');
const { createTransaction, updateItemOwner } = require('./controllers/transactionsController.js');

// Import modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
// Load dotenv module to access .env with: process.env.VARIABLENAME
require('dotenv').config();

// Load the server
const app = express();
// Define listened port
const port = 3000;

// Use modules on the server
app.use(cors());
app.use(bodyParser.json());


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

// Create url for routes
const route_Messages = '/messages';
const route_Users = '/users';
const route_UserByName = '/userbyname';
const route_Transactions = '/transactions';

// Create routes
app.get(route_Messages, (req,res) => {
    sendMessages(req,res,data);
});

app.post(route_Messages, (req,res) => {
    data = saveMessage(req,res,data);
});

app.get(route_Users, (req,res) => {
    getAllUsers(req,res,connectionDb);
});

app.get(route_UserByName, (req,res) => {
    getUserByName(req,res,connectionDb);
});

app.put(route_Transactions, (req,res) => {
    updateItemOwner(req,res,connectionDb);
});

app.post(route_Transactions, (req,res) => {
    createTransaction(req,res,connectionDb);
});


// Listen on defined port
app.listen(port, () => console.log('app running'));