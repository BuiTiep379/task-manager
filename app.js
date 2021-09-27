const express = require('express');
require('dotenv').config();

const app = express();
const connectDB = require("./src/db/index");

connectDB();
const tasksRouter = require("./src/routers/tasks");
const notFound = require("./src/middleware/not-found");

// middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
// middleware

app.use(express.static('./public'))


app.use('/api/v1/tasks', tasksRouter);
app.use(notFound);
const PORT = 2000 || process.env.PORT;

app.listen(PORT, () => {
    console.log(`App is running at http://localhost:${PORT}`);
})