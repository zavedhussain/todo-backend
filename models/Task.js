const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    //2nd argument is custom message on failing validation
    trim: true,
    maxlength: [20, "name is limited to 20 chars"],
  },
  completed: { type: Boolean, default: false },
});
//create a mongoose Schema based on which
// we create mongoose models
//mongoose models are used to interact with
//mongodb database
//A Schema gives the structure of a mongodb document

module.exports = mongoose.model("Task", TaskSchema);
//model name lowercase and pluralized is the collection
//in our database
