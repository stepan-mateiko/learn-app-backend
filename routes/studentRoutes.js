import { Router } from "express";
import { studentService } from "../services/studentService.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const students = await studentService.getAllStudents();
    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:ID", async (req, res) => {
  try {
    const { ID } = req.params;
    const studentData = req.body;
    const student = await studentService.updateStudent(ID, studentData);

    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ error: "Student not found" });
    }
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { router };

// import { Router } from "express";
// import { studentService } from "../services/studentService.js";
// import { responseMiddleware } from "../middlewares/response.middleware.js";
// import {
//   createStudentValid,
//   updateStudentValid,
// } from "../middlewares/student.validation.middleware.js";

// const router = Router();

// router.get(
//   "/",
//   (req, res, next) => {
//     try {
//       const students = studentService.getAllStudents();
//       if (students) {
//         req.body = {
//           students,
//         };
//         return req.body;
//       }
//     } catch ({ message }) {
//       return (req.body = {
//         error: true,
//         message,
//       });
//     } finally {
//       next();
//     }
//   },

//   responseMiddleware
// );

// router.get(
//   "/:id",
//   (req, res, next) => {
//     let id = req.params.id;
//     try {
//       const student = studentService.searchStudent({
//         id,
//       });
//       if (student) {
//         req.body = {
//           ...student,
//         };
//         return req.body;
//       } else {
//         throw new Error(`Student not found`);
//       }
//     } catch ({ message }) {
//       return (req.body = {
//         error: true,
//         message,
//       });
//     } finally {
//       next();
//     }
//   },
//   responseMiddleware
// );
// router.post(
//   "/",
//   createStudentValid,
//   (req, res, next) => {
//     try {
//       const { error, message } = req.body;
//       if (error) {
//         throw new Error(message);
//       }

//       const student = studentService.addStudent({
//         ...req.body,
//       });
//       req.body = {
//         ...student,
//       };
//       return req.body;
//     } catch ({ message }) {
//       return (req.body = {
//         error: true,
//         message,
//       });
//     } finally {
//       next();
//     }
//   },

//   responseMiddleware
// );

// router.put(
//   "/:id",
//   updateStudentValid,
//   (req, res, next) => {
//     let id = req.params.id;
//     const { error, message } = req.body;
//     try {
//       if (error) {
//         throw new Error(message);
//       }
//       const student = studentService.updateStudent(id, req.body);
//       if (student) {
//         req.body = {
//           ...student,
//         };

//         return req.body;
//       } else {
//         throw new Error(`Student not found`);
//       }
//     } catch ({ message }) {
//       return (req.body = {
//         error: true,
//         message,
//       });
//     } finally {
//       next();
//     }
//   },
//   responseMiddleware
// );

// router.delete(
//   "/:id",
//   (req, res, next) => {
//     let id = req.params.id;
//     try {
//       const student = studentService.removeStudent(id);
//       if (student) {
//         req.body = {
//           student,
//         };
//         return req.body;
//       } else {
//         throw new Error(`Student not found`);
//       }
//     } catch ({ message }) {
//       return (req.body = {
//         error: true,
//         message,
//       });
//     } finally {
//       next();
//     }
//   },

//   responseMiddleware
// );

// export { router };
