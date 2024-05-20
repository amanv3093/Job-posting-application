const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("./routers/job");
const PORT = 8001;
dotenv.config();
mongoose
  .connect(process.env.DBSTRING)
  .then(() => {
    console.log("Connected to MongoDB with success!");
  })
  .catch((err) => {
    console.log("Connection failed : ", err);
  });

const app = express();
app.use(express.urlencoded({ extended: false }));

app.use("/job",router);


app.listen(PORT , ()=>console.log(`Server is up and running on port: ${PORT}`))