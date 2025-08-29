import { sequelize } from "../db";

import { DataTypes, Model, Optional } from "sequelize";

export type TaskStatus = "todo" | "in_progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

interface TaskAttributes {
  id: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  created_at?: Date;
  updated_at?: Date;
}

interface TaskCreationAttributes
  extends Optional<TaskAttributes, "id" | "description" | "status" | "created_at" | "updated_at"> {}

export class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
  public id!: number;
  public title!: string;
  public description!: string | null;
  public status!: TaskStatus;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Task.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING(500), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    status: {
      type: DataTypes.ENUM("todo", "in_progress", "done"),
      allowNull: false,
      defaultValue: "todo",
    },
  },
  { sequelize, tableName: "tasks" }
);
