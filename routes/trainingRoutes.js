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
router.post("/hello", async (req, res) => {
  try {
    const trainers = await trainerService.getAllTrainers();
    console.log(trainers);
  } catch (error) {
    console.log(error);
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

// import { Router } from "express";
// import { trainingService } from "../services/trainingService.js";
// import { responseMiddleware } from "../middlewares/response.middleware.js";
// import { createTrainingValid } from "../middlewares/training.validation.middleware.js";
// import { trainerService } from "../services/trainerService.js";
// import { studentService } from "../services/studentService.js";

// const router = Router();
// router.get(
//   "/",
//   (req, res, next) => {
//     try {
//       const trainings = trainingService.getAllTrainings();
//       if (trainings) {
//         req.body = {
//           trainings,
//         };
//         return req.body;
//       }
//     } catch ({ message }) {
//       return (req.body = {
//         error: true,
//         message,
//       });
//     } finally {
//       next();
//     }
//   },

//   responseMiddleware
// );
// router.post(
//   "/",
//   createTrainingValid,
//   (req, res, next) => {
//     try {
//       const { error, message } = req.body;
//       if (error) {
//         throw new Error(message);
//       }
//       const training = trainingService.addTraining({
//         ...req.body,
//       });
//       req.body = {
//         ...training,
//       };
//       const oldTrainerTrainings = trainerService
//         .getAllTrainers()
//         .filter((item) => item.id === training.trainer)[0].trainings;
//       const oldTrainerStudents = trainerService
//         .getAllTrainers()
//         .filter((item) => item.id === training.trainer)[0].students;

//       const oldStudentTrainings = studentService
//         .getAllStudents()
//         .filter((item) => item.id === training.student)[0].trainings;
//       const oldStudentTrainers = studentService
//         .getAllStudents()
//         .filter((item) => item.id === training.student)[0].trainers;

//       const trainer = trainerService.updateTrainer(training.trainer, {
//         trainings: [...oldTrainerTrainings, training.id],
//         students: Array.from(
//           new Set([...oldTrainerStudents, training.student])
//         ),
//       });
//       const student = studentService.updateStudent(training.student, {
//         trainings: [...oldStudentTrainings, training.id],
//         trainers: Array.from(
//           new Set([...oldStudentTrainers, training.trainer])
//         ),
//       });
//       return (req.body = { training, trainer, student });
//     } catch ({ message }) {
//       return (req.body = {
//         error: true,
//         message,
//       });
//     } finally {
//       next();
//     }
//   },
//   responseMiddleware
// );

// router.delete(
//   "/:id",
//   (req, res, next) => {
//     let id = req.params.id;
//     try {
//       const training = trainingService.removeTraining(id);
//       if (training) {
//         req.body = {
//           training,
//         };
//         return req.body;
//       } else {
//         throw new Error(`Training not found`);
//       }
//     } catch ({ message }) {
//       return (req.body = {
//         error: true,
//         message,
//       });
//     } finally {
//       next();
//     }
//   },

//   responseMiddleware
// );
// export { router };
