import { Router } from "express";
import { userService } from "../services/userService.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = Router();

router.post("/login", async (req, res) => {
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

    const token = jwt.sign(
      { userId: existingUser.ID, userName: existingUser.userName },
      process.env.TOKEN_KEY,
      { expiresIn: "1h" }
    );

    res.json({ ...existingUser, token });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});

router.post("/register", async (req, res) => {
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
      const token = jwt.sign(
        { userId: existingUser.ID, userName: existingUser.userName },
        process.env.TOKEN_KEY,
        { expiresIn: "1h" }
      );
      res.json({ user, extraData, token });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { router };
