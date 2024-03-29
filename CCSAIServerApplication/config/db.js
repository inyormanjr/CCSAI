const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    autoIndex: true,
    useUnifiedTopology: true
}

const connectDB = async() => {
    const conn = await mongoose.connect(process.env.MONGO_URI, options);
    console.log(`MongoDB Connected : ${conn.connection.host}`.cyan.underline.bold);
}

module.exports = connectDB;