import dotenv from "dotenv";
dotenv.config();

export default (): ENV => {
  return {
    PORT: process.env.PORT || "",
    NODE_ENV: process.env.NODE_ENV || "",
    DB_URL: process.env.DB_URL || "",
  };
};

export interface ENV {
  PORT: string;
  NODE_ENV: string;
  DB_URL: string;
}
