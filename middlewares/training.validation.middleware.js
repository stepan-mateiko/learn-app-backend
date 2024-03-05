import { TRAINING } from "../models/training.js";
import { trainingService } from "../services/trainingService.js";
import { getUserAgent } from "../helpers/userAgent.js";

const createTrainingValid = (req, res, next) => {
  try {
    let userAgent = getUserAgent(
      req.headers["user-agent"],
      "PostmanRuntime/7.30.0",
      req
    );

    const { name, duration, date, student, trainer, type, description } =
      userAgent;
    trainingService.checkIfRightField(TRAINING, userAgent);

    const training = {
      name,
      duration,
      date,
      student,
      trainer,
      type,
      description,
    };
    return (req.body = training);
  } catch ({ message }) {
    req.body = {
      error: true,
      message,
    };
    return req.body;
  } finally {
    next();
  }
};

const updateTrainingValid = (req, res, next) => {
  try {
    let userAgent = getUserAgent(
      req.headers["user-agent"],
      "PostmanRuntime/7.30.0",
      req
    );
    trainingService.checkIfRightField(TRAINER, req.body);

    const training = {
      ...userAgent,
    };
    return (req.body = training);
  } catch ({ message }) {
    req.body = {
      error: true,
      message,
    };
    return req.body;
  } finally {
    next();
  }
};

export { createTrainingValid, updateTrainingValid };
