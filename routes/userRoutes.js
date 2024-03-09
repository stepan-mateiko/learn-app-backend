// routes/userRoutes.js

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

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    const isUserPresentInDBbyEmail = await userService.getOneUser({ email });

    if (isUserPresentInDBbyEmail) {
      res.status(400).json({ error: "User already exists" });
    } else {
      const userData = req.body;
      const user = await userService.addUser(userData);
      let extraData;

      if (userData.role === "trainer") {
        extraData = await trainerService.addTrainer(userData);
      } else {
        extraData = await studentService.addStudent(userData);
      }

      res.json({ user, extraData });
    }
  } catch (error) {
    console.error("Error creating user:", error);
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

// Implement other route handlers using userService methods

// export { router };

// import { Router } from "express";
// import { v4 } from "uuid";

// import { userService } from "../services/userService.js";
// import { trainerService } from "../services/trainerService.js";
// import { studentService } from "../services/studentService.js";
// import {
//   createUserValid,
//   updateUserValid,
// } from "../middlewares/user.validation.middleware.js";
// import { responseMiddleware } from "../middlewares/response.middleware.js";
// import { trainingService } from "../services/trainingService.js";

// const router = Router();

// router.get(
//   "/",
//   (req, res, next) => {
//     try {
//       const users = userService.getAllUsers();
//       if (users) {
//         req.body = {
//           users,
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
//   "/:userName",
//   (req, res, next) => {
//     let userName = req.params.userName;
//     try {
//       const user = userService.getOneUser({
//         userName,
//       });
//       if (user) {
//         req.body = {
//           ...user,
//         };
//         return req.body;
//       } else {
//         throw new Error(`User not found`);
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
//   createUserValid,
//   (req, res, next) => {
//     try {
//       const { error, message } = req.body;
//       if (error) {
//         throw new Error(message);
//       }
//       const { email } = req.body;
//       const isUserPresentInDBbyEmail = userService.getOneUser({
//         email,
//       });

//       if (!isUserPresentInDBbyEmail) {
//         req.body.id = v4();
//         const userData = JSON.parse(JSON.stringify(req.body));
//         const users = userService.addUser(userData);
//         let extraData;
//         if (req.body.role === "trainer") {
//           extraData = trainerService.addTrainer(req.body);
//         } else {
//           extraData = studentService.addStudent(req.body);
//         }

//         req.body = {
//           users,
//           extraData,
//         };
//         return req.body;
//       } else {
//         throw new Error("User already exists");
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

// router.put(
//   "/:id",
//   updateUserValid,
//   (req, res, next) => {
//     let id = req.params.id;
//     const { error, message } = req.body;
//     try {
//       if (error) {
//         throw new Error(message);
//       }
//       const userData = JSON.parse(JSON.stringify(req.body));
//       const user = userService.updateUser(id, userData);
//       let extraData;
//       if (req.body.role === "trainer") {
//         const trainerData = JSON.parse(JSON.stringify(req.body));
//         extraData = trainerService.updateTrainer(id, trainerData);
//       } else {
//         const studentData = JSON.parse(JSON.stringify(req.body));
//         extraData = studentService.updateStudent(id, studentData);
//       }

//       if (user) {
//         req.body = {
//           ...user,
//         };
//         return req.body;
//       } else {
//         throw new Error(`User not found`);
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
//       const user = userService.removeUser(id);
//       const student = studentService.removeStudent(id);
//       const trainer = trainerService.removeTrainer(id);
//       const trainings = trainingService
//         .getAllTrainings()
//         .filter((item) => item.trainer === id || item.student === id)
//         .map((item) => trainingService.removeTraining(item.id));
//       if (user) {
//         req.body = {
//           user,
//           student,
//           trainer,
//           trainings,
//         };
//         return req.body;
//       } else {
//         throw new Error(`User not found`);
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
