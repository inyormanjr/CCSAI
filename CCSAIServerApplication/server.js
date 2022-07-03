const express = require('express');
const dotenv = require('dotenv');
const { setSocketInstance } = require('./utils/chatbotsocket');
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
const enrollmentDetails = require('./routes/enrollmentDetails');
const modules = require('./routes/modules');
const discussions = require('./routes/discussion');
const dashboard = require('./routes/dashboard');
const anouncement = require('./routes/anouncement');

const apiBaseRouteV1 = '/api/v1/';

app.use(apiBaseRouteV1 + 'auth', auth);
app.use(apiBaseRouteV1 + 'users', users);
app.use(apiBaseRouteV1 + 'courses', courses);
app.use(apiBaseRouteV1 + 'terms', terms);
app.use(apiBaseRouteV1 + 'enrollment', enrollment);
app.use(apiBaseRouteV1 + 'enrollmentdetails', enrollmentDetails);
app.use(apiBaseRouteV1 + 'modules', modules);
app.use(apiBaseRouteV1 + 'discussions', discussions);
app.use(apiBaseRouteV1 + 'dashboard', dashboard);
app.use(apiBaseRouteV1 + 'anouncement', anouncement);

const PORT = 5001;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    .yellow.bold));

setSocketInstance(server);

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(errorHandler);

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red.bold);
    server.close(() => process.exit(1));
});