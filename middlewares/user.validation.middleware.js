import { USER } from "../models/user.js";
import { userService } from "../services/userService.js";
import { getUserAgent } from "../helpers/userAgent.js";

const createUserValid = (req, res, next) => {
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
      userName,
      password,
      dob,
      address,
      role,
      specialization,
      students,
      trainers,
      trainings,
    } = userAgent;
    userService.checkIfRightField(USER, userAgent);
    if (!firstName) {
      throw new Error(`Error. First name must not be empty`);
    }
    if (!lastName) {
      throw new Error(`Error. Last name must not be empty`);
    }
    if (!email) {
      throw new Error(`Error. Email must not be empty`);
    }

    const user = {
      firstName,
      lastName,
      email,
      userName,
      password,
      dob: dob ? dob : "",
      address: address ? address : "",
      role,
      specialization: specialization ? specialization : "student",
      students: students ? students : [],
      trainers: trainers ? trainers : [],
      trainings: trainings ? trainings : [],
    };
    return (req.body = user);
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

const updateUserValid = (req, res, next) => {
  try {
    let userAgent = getUserAgent(
      req.headers["user-agent"],
      "PostmanRuntime/7.30.0",
      req
    );
    userService.checkIfRightField(USER, req.body);

    const user = {
      ...userAgent,
    };
    return (req.body = user);
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

export { createUserValid, updateUserValid };
