import { studentRepository } from "../repositories/studentRepository.js";

class StudentService {
  getAllStudents() {
    return studentRepository.getAll();
  }
  addStudent(data) {
    return studentRepository.create(data);
  }
  updateStudent(id, dataToUpdate) {
    return studentRepository.update(id, dataToUpdate);
  }
  getOneStudent(search) {
    return studentRepository.getOne(search);
  }
  removeStudent(id) {
    return studentRepository.delete(id);
  }
}

const studentService = new StudentService();

export { studentService };
