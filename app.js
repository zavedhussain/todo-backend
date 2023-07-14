const connectDB = require("./db/connect");
const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandlerMiddleWare = require("./middleware/error-handler");

const { DB_URI } = process.env;
//middleware

//serve static files from public folder
app.use(express.static("./public"));

//to get form data(JSON payloads) in req.body
app.use(express.json());

//to get url payloads in req.body
//app.use(express.urlencoded({extended:true}))

//routes
app.use("/api/v1/tasks", tasks);

//error 404 when none of the route endpoints reached
app.use(notFound);
app.use(errorHandlerMiddleWare);

const port = process.env.PORT || 3000;

const start = async () => {
  //takes connection promise then starts app
  try {
    await connectDB(DB_URI);
    console.log("connected to db...");
    app.listen(port, "localhost", () => {
      console.log(`listening on ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
