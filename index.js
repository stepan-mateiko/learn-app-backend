import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { initRoutes } from "./routes/routes.js";
import { connectToDatabase } from "./db/db.js";
import { handleFileUpload } from "./handlers/imageHandler.js";
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
const port = process.env.API_PORT || 3080;
handleFileUpload(app);

async function startServer() {
  await connectToDatabase();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer();
export { app };
