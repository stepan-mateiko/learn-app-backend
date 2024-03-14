import { Router } from "express";
import { specializationService } from "../services/specializationService.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const specializations = await specializationService.getAllSpecializations();
    res.json(specializations);
  } catch (error) {
    console.error("Error fetching specializations:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { router };
