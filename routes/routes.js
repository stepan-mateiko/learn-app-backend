import { router as userRoutes } from "./userRoutes.js";
import { router as authRoutes } from "./authRoutes.js";
import { router as trainerRoutes } from "./trainerRoutes.js";
import { router as trainingRoutes } from "./trainingRoutes.js";
import { router as studentRoutes } from "./studentRoutes.js";
import { router as specializationRoutes } from "./specializationRoutes.js";
import { router as trainingTypeRoutes } from "./trainingTypeRoutes.js";

const initRoutes = (app) => {
  app.use("/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/trainers", trainerRoutes);
  app.use("/api/trainings", trainingRoutes);
  app.use("/api/students", studentRoutes);
  app.use("/api/specializations", specializationRoutes);
  app.use("/api/trainingTypes", trainingTypeRoutes);
};

export { initRoutes };
