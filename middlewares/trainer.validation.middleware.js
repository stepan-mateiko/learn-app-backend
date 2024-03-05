import { TRAINER } from "../models/trainer.js";
import { trainerService } from "../services/trainerService.js";
import { getUserAgent } from "../helpers/userAgent.js";

const createTrainerValid = (req, res, next) => {
  try {
    let userAgent = getUserAgent(
      req.headers["user-agent"],
      "PostmanRuntime/7.30.0",
      req
    );

    const {
      firstName,
      lastName,
      email,
      dob,
      address,
      role,
      specialization,
      students,
      trainings,
    } = userAgent;
    trainerService.checkIfRightField(TRAINER, userAgent);

    const trainer = {
      firstName,
      lastName,
      email,
      dob,
      address,
      role,
      specialization,
      students,
      trainings,
    };
    return (req.body = trainer);
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

const updateTrainerValid = (req, res, next) => {
  try {
    let userAgent = getUserAgent(
      req.headers["user-agent"],
      "PostmanRuntime/7.30.0",
      req
    );
    trainerService.checkIfRightField(TRAINER, req.body);

    const trainer = {
      ...userAgent,
    };
    return (req.body = trainer);
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

export { createTrainerValid, updateTrainerValid };
