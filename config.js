require('dotenv').config();   //instatiate environment variables

let CONFIG = {}               //Make this global to use all over the application

CONFIG.port         = process.env.PORT  || '23456';

module.exports = CONFIG;
