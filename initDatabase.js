const database = require('./database');
const Student = require('./Models/Student');
const Teacher = require('./Models/Teacher');



module.exports.init = (flag) => {
    // flag that force should be true or false
    database.sync({ force: flag }).then(res => {
        console.log(" required database created ");
    }).catch(err => {
        console.log(err.message);
    })
}