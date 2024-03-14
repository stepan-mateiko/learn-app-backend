import { Router } from "express";
import { trainingService } from "../services/trainingService.js";
import { trainerService } from "../services/trainerService.js";
import { studentService } from "../services/studentService.js";
const router = Router();

router.get("/", async (req, res) => {
  try {
    const trainings = await trainingService.getAllTrainings();
    res.json(trainings);
  } catch (error) {
    console.error("Error fetching trainings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const trainingData = req.body;
    const training = await trainingService.addTraining(trainingData);
    const trainers = await trainerService.getAllTrainers();
    const students = await studentService.getAllStudents();

    const trainer = trainerService.updateTrainer(trainingData.trainer, {
      trainings: [
        ...trainers.filter((item) => item.ID === trainingData.trainer)[0]
          .trainings,
        trainingData.ID,
      ],
      students: Array.from(
        new Set([
          ...trainers.filter((item) => item.ID === trainingData.trainer)[0]
            .students,
          trainingData.student,
        ])
      ),
    });
    const student = studentService.updateStudent(trainingData.student, {
      trainings: [
        ...students.filter((item) => item.ID === trainingData.student)[0]
          .trainings,
        trainingData.ID,
      ],
      trainers: Array.from(
        new Set([
          ...students.filter((item) => item.ID === trainingData.student)[0]
            .trainers,
          trainingData.trainer,
        ])
      ),
    });

    res.json({ training, trainer, student });
  } catch (error) {
    console.error("Error creating training:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { router };
