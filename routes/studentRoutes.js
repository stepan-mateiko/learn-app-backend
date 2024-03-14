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
