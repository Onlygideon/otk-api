import { Router } from "express";
import validateRequest from "../middleware/validateRequest";
import { createTaskSchema, updateTaskSchema } from "../schemas/task.schema";
import {
  createTask,
  fetchAllTasks,
  fetchSingleTask,
  updateTask,
  deleteTask,
} from "../controller/task";

const router: Router = Router();

router.route("/create").post(validateRequest(createTaskSchema), createTask);

router.route("/update").put(validateRequest(updateTaskSchema), updateTask);

router.route("/all").get(fetchAllTasks);

router.route("/:id").get(fetchSingleTask);

router.route("/delete/:id").delete(deleteTask);

export default router;
