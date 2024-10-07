import { Router } from "express";
import { userService } from "../services/userService.js";
import { studentService } from "../services/studentService.js";
import { trainerService } from "../services/trainerService.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { addToBlacklist } from "../middlewares/blacklist.js";

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

    const token = jwt.sign(existingUser, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });

    res.json({ existingUser, token: `Bearer ${token}` });
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
      const token = jwt.sign(userData, process.env.TOKEN_KEY, {
        expiresIn: "1h",
      });
      res.json({ user, extraData, token: `Bearer ${token}` });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/logout", (req, res) => {
  try {
    console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1];
    addToBlacklist(token);
    res.status(200).json({ message: "Token revoked successfully" });
  } catch (error) {
    console.log(req.headers);
    res.status(500).json({ error: true, message: error.message });
  }
});

export { router };
