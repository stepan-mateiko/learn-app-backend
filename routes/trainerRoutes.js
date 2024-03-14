import { Router } from "express";
import { trainerService } from "../services/trainerService.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const trainers = await trainerService.getAllTrainers();
    res.json(trainers);
  } catch (error) {
    console.error("Error fetching trainers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:ID", async (req, res) => {
  try {
    const { ID } = req.params;
    const trainerData = req.body;
    const trainer = await trainerService.updateTrainer(ID, trainerData);

    if (trainer) {
      res.json(trainer);
    } else {
      res.status(404).json({ error: "Trainer not found" });
    }
  } catch (error) {
    console.error("Error updating trainer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { router };
