import { studentRepository } from "../repositories/studentRepository.js";

class StudentService {
  getAllStudents() {
    const item = studentRepository.getAll();
    if (!item) {
      return null;
    }
    return item;
  }
  addStudent(data) {
    const item = studentRepository.create(data);
    if (!item) {
      return null;
    }
    return item;
  }

  updateStudent(id, dataToUpdate) {
    const item = studentRepository.update(id, dataToUpdate);

    if (!item) {
      return null;
    }
    return item;
  }

  removeStudent(id) {
    const item = studentRepository.delete(id);

    if (item.length < 1) {
      return null;
    }
    return item;
  }

  searchStudent(search) {
    const item = studentRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  checkIfRightField(model, object) {
    for (const key in object) {
      if (Object.hasOwnProperty.call(object, key)) {
        if (key === "id") {
          continue;
        }
        if (!(key in model)) {
          throw new Error(`${key} must not be`);
        }
      }
    }
  }
}

const studentService = new StudentService();

export { studentService };
