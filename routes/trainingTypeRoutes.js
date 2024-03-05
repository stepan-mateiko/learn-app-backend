import { Router } from "express";
import { trainingTypeService } from "../services/trainingTypeService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();
router.get(
  "/",
  (req, res, next) => {
    try {
      const trainingTypes = trainingTypeService.getAllTrainingTypes();
      if (trainingTypes) {
        req.body = {
          trainingTypes,
        };
        return req.body;
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
