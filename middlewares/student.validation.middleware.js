import { STUDENT } from "../models/student.js";
import { studentService } from "../services/studentService.js";
import { getUserAgent } from "../helpers/userAgent.js";

const createStudentValid = (req, res, next) => {
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
      trainers,
      trainings,
    } = userAgent;
    studentService.checkIfRightField(STUDENT, userAgent);

    const student = {
      firstName,
      lastName,
      email,
      dob,
      address,
      role,
      specialization,
      trainers,
      trainings,
    };
    return (req.body = student);
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

const updateStudentValid = (req, res, next) => {
  try {
    let userAgent = getUserAgent(
      req.headers["user-agent"],
      "PostmanRuntime/7.30.0",
      req
    );
    studentService.checkIfRightField(STUDENT, req.body);

    const student = {
      ...userAgent,
    };
    return (req.body = student);
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

export { createStudentValid, updateStudentValid };
