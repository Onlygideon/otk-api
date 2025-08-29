import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Task } from "../models/index";

export const createTask = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { title, description, status } = req.body;

    const task = await Task.create({
      title,
      description: description,
      status,
    });

    res.status(201).json({ success: true, data: task });

    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal error" });
    return;
  }
});

export const fetchAllTasks = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { page = "1", limit = "10" } = req.query as Record<string, string>;
    const offset = (Number(page) - 1) * Number(limit);

    const { rows, count } = await Task.findAndCountAll({
      where: {},
      limit: Number(limit),
      offset,
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      data: {
        tasks: rows,
        page: Number(page),
        limit: Number(limit),
        total: count,
      },
    });

    return;
  } catch (error) {
    res.status(500).json({ error: "Internal error" });
    return;
  }
});

export const fetchSingleTask = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({
        success: true,
        error: "Task id is required",
      });

      return;
    }

    const task = await Task.findOne({ where: { id: id } });
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json({
      success: true,
      data: task,
    });

    return;
  } catch (error) {
    res.status(500).json({ error: "Internal error" });
    return;
  }
});

export const updateTask = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { taskId, title, description, status } = req.body;

    const task = await Task.findOne({ where: { id: taskId } });
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    await task.update({ title, description, status, updatedAt: new Date() });

    res.status(201).json({ success: true, data: "Task Updated" });

    return;
  } catch (error) {
    res.status(500).json({ error: "Internal error" });
    return;
  }
});

export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({
        success: true,
        error: "Task id is required",
      });

      return;
    }

    const task = await Task.findOne({ where: { id: id } });
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    await task.destroy();

    res.status(200).json({
      success: true,
      data: "Task Deleted",
    });

    return;
  } catch (error) {
    res.status(500).json({ error: "Internal error" });
    return;
  }
});
