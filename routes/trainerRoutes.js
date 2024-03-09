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

// import { Router } from "express";
// import { trainerService } from "../services/trainerService.js";
// import { responseMiddleware } from "../middlewares/response.middleware.js";
// import {
//   createTrainerValid,
//   updateTrainerValid,
// } from "../middlewares/trainer.validation.middleware.js";

// const router = Router();

// router.get(
//   "/",
//   (req, res, next) => {
//     try {
//       const trainers = trainerService.getAllTrainers();
//       if (trainers) {
//         req.body = {
//           trainers,
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

// router.get(
//   "/:id",
//   (req, res, next) => {
//     let id = req.params.id;
//     try {
//       const trainer = trainerService.searchTrainer({
//         id,
//       });
//       if (trainer) {
//         req.body = {
//           ...trainer,
//         };
//         return req.body;
//       } else {
//         throw new Error(`Trainer not found`);
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
//   createTrainerValid,
//   (req, res, next) => {
//     try {
//       const { error, message } = req.body;
//       if (error) {
//         throw new Error(message);
//       }

//       const trainer = trainerService.addTrainer({
//         ...req.body,
//       });
//       req.body = {
//         ...trainer,
//       };
//       return req.body;
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

// router.put(
//   "/:id",
//   updateTrainerValid,
//   (req, res, next) => {
//     let id = req.params.id;
//     const { error, message } = req.body;
//     try {
//       if (error) {
//         throw new Error(message);
//       }
//       const trainer = trainerService.updateTrainer(id, req.body);
//       if (trainer) {
//         req.body = {
//           ...trainer,
//         };
//         return req.body;
//       } else {
//         throw new Error(`Trainer not found`);
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

// router.delete(
//   "/:id",
//   (req, res, next) => {
//     let id = req.params.id;
//     try {
//       const trainer = trainerService.removeTrainer(id);
//       if (trainer) {
//         req.body = {
//           trainer,
//         };
//         return req.body;
//       } else {
//         throw new Error(`Trainer not found`);
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
