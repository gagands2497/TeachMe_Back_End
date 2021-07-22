const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const auth_route = require('./Routes/auth')
const databaseINIT = require('./initDatabase');
const cookieParser = require('cookie-parser');
const teacherRoute = require('./Routes/teacher');

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

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    // send the documentation
    res.status(200).json({
        message: "Welcome to Teach me Backend"
    })
})


app.use('/auth', auth_route);
// app.use('/teacher', teacherRoute);

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