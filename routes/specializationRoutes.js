import { Router } from "express";
import { specializationService } from "../services/specializationService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();
router.get(
  "/",
  (req, res, next) => {
    try {
      const specializations = specializationService.getAllSpecializations();
      if (specializations) {
        req.body = {
          specializations,
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
