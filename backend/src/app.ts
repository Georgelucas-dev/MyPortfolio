import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contact.routes";
import errorMiddleware from "./middlewares/error.middleware";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/contact", contactRoutes);
app.use(errorMiddleware);

export default app;
