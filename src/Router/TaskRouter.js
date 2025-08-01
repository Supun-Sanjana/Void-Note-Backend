import { Router } from "express";
import { createTask } from "../Controller/TaskController.js";

const taskRouter  = Router();

taskRouter.post('/', createTask)

export default taskRouter;