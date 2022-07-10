const express = require('express');
const dotenv = require('dotenv');
const { setSocketInstance } = require('./utils/chatbotsocket');
const { setRoutes } = require('./utils/appRoutingManager');

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
app.use(express.static(__dirname + '/dist'));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});


//routes manager
setRoutes(app);

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