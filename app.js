const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const auth_route = require('./Routes/auth')
const databaseINIT = require('./initDatabase');
const cookieParser = require('cookie-parser');
const teacherRoute = require('./Routes/teacher');
const studentRoute = require('./Routes/student');
const courseRoutes = require('./Routes/course');
const multer = require('multer');
const path = require('path');
// Handling CORS 

app.use(express.static(path.join(__dirname, 'Storage', "Profile_Images")))

const fileStorage = multer.diskStorage({
    destination: (req, res, cb) => {
        // cb is for callback
        // null is for indicating that the everything is good 
        cb(null, path.join(__dirname, "Storage", "Profile_Images"));
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, "_") + "_" + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
    }
}


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
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('profile_image'))

// app.post('/', (req, res) => {
//     // uploading testing of file upload
//     if (!req.file) {
//         const error = new Error("File is not an image");
//         error.data = [{
//             msg: "File is not an image"
//         }]
//         throw error;
//     }
//     res.json({
//         image_url: req.file.path
//     })
// })



app.get('/', (req, res) => {
    // send the documentation
    res.status(200).json({
        message: "Welcome to Teach me Backend"
    })
})


app.use('/auth', auth_route);
app.use('/teacher', teacherRoute);
app.use('/student', studentRoute);
app.use('/course', courseRoutes);
// error middleware


app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    console.log(error);
    res.status(status).json({
        message: message,
        errors: error.data
    });

})


app.listen(port, () => {
    // databaseINIT.init();
    console.log("server is running on port number " + port);
})