const express = require('express');
const dotenv = require('dotenv');

//dev utils
const morgan = require('morgan');
const colors = require('colors');

//Helper middlewares
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

//Security middlewares
const cors = require('cors');

dotenv.config({ path: './config/config.env' });
connectDB();
const app = express();
app.use(express.json());

app.use(cors());

//routes
const auth = require('./routes/auth');
const users = require('./routes/users');
const courses = require('./routes/courses');
const terms = require('./routes/terms');
const enrollment = require('./routes/enrollment');
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/courses', courses);
app.use('/api/v1/terms', terms);
app.use('/api/v1/enrollment', enrollment);

const PORT = 5001;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    .yellow.bold));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(errorHandler);

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red.bold);
    server.close(() => process.exit(1));
});