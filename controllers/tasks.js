const Task = require("../models/Task");

const { createCustomError } = require("../errors/custom-error");

//common error handler middleware for all APIs
const asyncWrapper = require("../middleware/async");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find();
  //queries act like prmoises but are not actually promises
  //read more on this
  res.status(200).json({ tasks });
});

const createSingleTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getSingleTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  //destructuring and set alias
  const task = await Task.findOne({ _id: taskID });
  //if item does not exist
  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  }
  //if item exists
  res.status(200).json({ task });
});

const updateSingleTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const update = req.body;
  const options = { new: true, runValidators: true };
  //need to set options for validation and return updated doc
  const task = await Task.findOneAndUpdate({ _id: taskID }, update, options);
  //if item does not exist
  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  }
  //if item exists
  res.status(200).json({ task });
});

const deleteSingleTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  //destructuring and set alias
  const task = await Task.findOneAndDelete({ _id: taskID });
  //if item does not exist
  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  }
  //if item exists
  res.status(200).json({ task });
  //other responses for delete
  //res.status(200).send()
  //res.status(200).json({task:null,status:"success"})
});

module.exports = {
  getAllTasks,
  createSingleTask,
  getSingleTask,
  updateSingleTask,
  deleteSingleTask,
};
