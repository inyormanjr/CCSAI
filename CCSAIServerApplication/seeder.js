const fs = require('fs'); //filestream
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');
const process = require('process');

const User = require('./models/User');
const Course = require('./models/Course');
const Term = require('./models/Term');
const Enrollment = require('./models/Enrollment');
const Discussion = require('./models/Discussion');
const Assessment = require('./models/Assessment');

dotenv.config({
    path: './config/config.env'
});

const options = {
    useNewUrlParser: true,
    autoIndex: true,
    useUnifiedTopology: true
}

mongoose.connect(process.env.MONGO_URI, options);

const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/user.json`, 'utf-8'));
const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/course.json`, 'utf-8'));
const terms = JSON.parse(fs.readFileSync(`${__dirname}/_data/term.json`, 'utf-8'));
const enrollment = JSON.parse(fs.readFileSync(`${__dirname}/_data/enrollment.json`, 'utf-8'));

const importData = async() => {
    try {
        await User.create(users);
        await Course.create(courses);
        await Term.create(terms);
        await Enrollment.create(enrollment);
        console.log('Data Imported...'.green.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
}


const deleteData = async() => {
    try {
        await User.deleteMany();
        await Course.deleteMany();
        await Term.deleteMany();
        await Enrollment.deleteMany();
        await Discussion.deleteMany();

        console.log('Data destroyed...'.red.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
}

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}