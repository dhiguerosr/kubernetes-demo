const express = require('express');
const morgan = require('morgan');

const app = express();
const {PORT, HOSTNAME} = require('./config')

app.use(morgan('tiny'));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization, Content-Length, X-Requested-With, Accept');
    if(req.method === "OPTIONS"){
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
        return res.status(200).json({});
    }
    next();
});

app.get('/', async(req, res) => {
    res.status(200).send("<div><p>Hello world!<br>Current service version: " + process.env.npm_package_version + "</p></div>");
});

module.exports = app.listen(PORT, HOSTNAME, () => {
    console.log(`Server is running on port ${PORT} and hostname ${HOSTNAME}`)
});
