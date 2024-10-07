import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { initRoutes } from "./routes/routes.js";
import { connectToDatabase } from "./db/db.js";
import { handleFileUpload } from "./handlers/imageHandler.js";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { verifyToken } from "./middlewares/verifyToken.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", verifyToken);
app.use("/api/trainers", verifyToken);
app.use("/api/students", verifyToken);
app.use("/api/trainings", verifyToken);

initRoutes(app);
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use("/uploads", express.static(join(__dirname, "uploads")));

const port = process.env.API_PORT || 3080;
handleFileUpload(app, port);

async function startServer() {
  await connectToDatabase();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer();
export { app };
