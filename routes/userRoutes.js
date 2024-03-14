import { Router } from "express";
import { userService } from "../services/userService.js";
import { trainerService } from "../services/trainerService.js";
import { studentService } from "../services/studentService.js";
import { trainingService } from "../services/trainingService.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:userName", async (req, res) => {
  try {
    const { userName } = req.params;
    const user = await userService.getOneUser({ userName });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:ID", async (req, res) => {
  try {
    const { ID } = req.params;
    const userData = req.body;
    const user = await userService.updateUser(ID, userData);
    let extraData;

    if (userData.role === "trainer") {
      extraData = await trainerService.updateTrainer(ID, userData);
    } else {
      extraData = await studentService.updateStudent(ID, userData);
    }

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:ID", async (req, res) => {
  try {
    const { ID } = req.params;
    const user = await userService.removeUser(ID);
    const student = await studentService.removeStudent(ID);
    const trainer = await trainerService.removeTrainer(ID);
    const trainings = await trainingService.getAllTrainings();
    trainings
      .filter((item) => item.trainer === ID || item.student === ID)
      .map((item) => trainingService.removeTraining(item.ID));

    res.json({ user, student, trainer, trainings });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { router };
