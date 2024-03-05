import { Router } from "express";
import { studentService } from "../services/studentService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createStudentValid,
  updateStudentValid,
} from "../middlewares/student.validation.middleware.js";

const router = Router();

router.get(
  "/",
  (req, res, next) => {
    try {
      const students = studentService.getAllStudents();
      if (students) {
        req.body = {
          students,
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

router.get(
  "/:id",
  (req, res, next) => {
    let id = req.params.id;
    try {
      const student = studentService.searchStudent({
        id,
      });
      if (student) {
        req.body = {
          ...student,
        };
        return req.body;
      } else {
        throw new Error(`Student not found`);
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
router.post(
  "/",
  createStudentValid,
  (req, res, next) => {
    try {
      const { error, message } = req.body;
      if (error) {
        throw new Error(message);
      }

      const student = studentService.addStudent({
        ...req.body,
      });
      req.body = {
        ...student,
      };
      return req.body;
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

router.put(
  "/:id",
  updateStudentValid,
  (req, res, next) => {
    let id = req.params.id;
    const { error, message } = req.body;
    try {
      if (error) {
        throw new Error(message);
      }
      const student = studentService.updateStudent(id, req.body);
      if (student) {
        req.body = {
          ...student,
        };

        return req.body;
      } else {
        throw new Error(`Student not found`);
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

router.delete(
  "/:id",
  (req, res, next) => {
    let id = req.params.id;
    try {
      const student = studentService.removeStudent(id);
      if (student) {
        req.body = {
          student,
        };
        return req.body;
      } else {
        throw new Error(`Student not found`);
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
