import { Router } from "express";
import { trainingTypeService } from "../services/trainingTypeService.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const trainingTypes = await trainingTypeService.getAllTrainingTypes();
    res.json(trainingTypes);
  } catch (error) {
    console.error("Error fetching training types:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { router };
