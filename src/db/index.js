const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/taskmanager', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected successfully!!!");
    } catch (error) {
        console.log("Database connected failed!!!");
    }
};

module.exports = connectDB;