import { Sequelize } from "sequelize";
import env from "../config/env";

const { DB_URL } = env();

export const sequelize = new Sequelize(DB_URL, {
  dialect: "mysql",
  logging: false,
});

export async function connectDB() {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // For dev
    console.log("✅ MySQL connected and models synced");
  } catch (err) {
    console.error("❌ DB connection error:", err);
    process.exit(1);
  }
}
