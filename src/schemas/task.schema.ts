import Joi from "joi";

export const createTaskSchema = Joi.object({
  title: Joi.string().min(1).max(250).required(),
  description: Joi.string().required(),
  status: Joi.string().valid("todo", "in_progress", "done").default("todo"),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().min(1).max(200),
  description: Joi.string(),
  status: Joi.string().valid("todo", "in_progress", "done"),
}).min(1);
