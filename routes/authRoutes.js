import { Router } from "express";
import { authService } from "../services/authService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.post(
  "/",
  (req, res, next) => {
    try {
      const userData = req.body;
      const user = authService.login(userData);
      if (user) {
        req.body = {
          ...user,
        };

        return req.body;
      } else {
        throw new Error(`User not found`);
      }
    } catch ({ message }) {
      return (req.body = {
        error: true,
        message,
      });
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };
