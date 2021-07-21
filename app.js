const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const auth_route = require('./Routes/auth')
const databaseINIT = require('./initDatabase');


// Handling CORS 

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Origin , Accept , Authorization , X-Requested-With'
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
})

app.use(express.json())
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome to Teach me Backend"
    })
})

app.use('/auth', auth_route)

// error middleware
app.use((error, req, res, next) => {
    res.status(error.statusCode).json({
        error: error
    })
})



app.listen(port, () => {
    databaseINIT.init(false);
    console.log("server is running on port number " + port);
})