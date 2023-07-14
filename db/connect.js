const mongoose = require("mongoose");

const connectDB = (url) => {
  //this returns a promise for connection
  return mongoose.connect(url, {
    //some options to remove deprecation warnings
    //for using older mongoose version
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
