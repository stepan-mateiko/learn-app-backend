import { Router } from "express";
import { userService } from "../services/userService.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const userData = req.body;
    const users = await userService.getAllUsers();
    const existingUser = users.find(
      (user) => user.userName === userData.userName
    );
    if (!existingUser) {
      throw new Error("User not found");
    }
    if (existingUser.password !== userData.password) {
      throw new Error("Password incorrect");
    }
    res.json(existingUser);
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});

export { router };

// import { Router } from "express";
// import { authService } from "../services/authService.js";
// import { responseMiddleware } from "../middlewares/response.middleware.js";

// const router = Router();

// router.post(
//   "/",
//   (req, res, next) => {
//     try {
//       const userData = req.body;
//       const user = authService.login(userData);
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

// export { router };
