// var mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// mongoose.set('useFindAndModify', false);
//
// // Connecting to the database
// mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useCreateIndex: true }).then(() => {
//     console.log("Successfully connected to the database");
// }).catch(err => {
//     console.log('Could not connect to the database. Exiting now...', err);
//     process.exit();
// });

const My = require('jm-ez-mysql');

// Init DB Connection
const connection = My.init({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DATABASE,
    dateStrings: true,
    charset: 'utf8mb4',
    timezone: 'utc',
    multipleStatements: true,
    connectTimeout: 100 * 60 * 1000,
    acquireTimeout: 100 * 60 * 1000,
    timeout: 100 * 60 * 1000,
});

module.exports = {
    connection,
};
