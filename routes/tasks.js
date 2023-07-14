const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  getSingleTask,
  createSingleTask,
  updateSingleTask,
  deleteSingleTask,
} = require("../controllers/tasks");

router.route("/").get(getAllTasks).post(createSingleTask);
router
  .route("/:id")
  .get(getSingleTask)
  .patch(updateSingleTask)
  .delete(deleteSingleTask);

//can write individually or chain routes
//router.get("/",getAllTasks)
//router.post("/",createSingleTask)
//router.get("/:id",getSingleTask)
//router.patch("/:id",updateSingleTask)
//router.delete("/:id",deleteSingleTask)

module.exports = router;
