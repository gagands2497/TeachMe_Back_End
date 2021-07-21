const database = require('./database');
// const database = require('sequelize');
const Student = require('./Models/Student');



database.sync({ force: true }).then(res => {

}).catch(err => {
    console.log(err.message);
})

Student.create({
    name: "GAGAN"
}).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err.message);
})





