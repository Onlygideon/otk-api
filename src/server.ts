import express, { Request, Response } from "express";
import { sequelize } from "./db/index";
import taskRoutes from "./route/task";
import env from "./config/env";

const app = express();
app.use(express.json());

app.get("/api", (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "Hello, Welcome To Otk  API" });
});

app.use("/api/task", taskRoutes);

const PORT = env().PORT || 8080;

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("DB connection failed:", err));
