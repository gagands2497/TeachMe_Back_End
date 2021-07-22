const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const auth_route = require('./Routes/auth')
const databaseINIT = require('./initDatabase');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');




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
app.use(cookieParser())

app.get('/', (req, res) => {
    // send the documentation
    console.log(req.headers.authorization);
    res.status(200).json({
        message: "Welcome to Teach me Backend"
    })
})


app.get('/login', (req, res) => {
    console.log('Cookies: ', req.cookies)
    let time = 24 * 60 * 60 * 1000;


    res.status(200).json({
        message: "Logged in"
    })
})

app.use('/auth', auth_route)

// error middleware


app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({
        message: message,
        data: error.data
    });

})



app.listen(port, () => {
    databaseINIT.init(false);
    console.log("server is running on port number " + port);
})