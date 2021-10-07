import express from "express";
import { readdirSync } from "fs";
import cors from "cors";
import mongoose from 'mongoose';
const morgan = require("morgan");
require('dotenv').config();

// import dotenv
const dotenv = require("dotenv");
dotenv.config();


const app = express();

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());


// database connection
mongoose.connect(process.env.MONGO_URI, {
        useUnifiedTopology: true, 
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(() => console.log("DB Connected"));

    //listener
mongoose.connection.on("error", err => {
    console.log(`DB connection error: ${err.message}`);
});

// route middleware
readdirSync("./routes").map((r) => app.use('/api', require(`./routes/${r}`)));

const port = process.env.PORT || 8000;

app.listen(8000, () => console.log(`Server is running on port ${port}`)); 