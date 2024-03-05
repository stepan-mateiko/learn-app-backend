import { BaseRepository } from "./baseRepository.js";
import { studentDbAdapter } from "../config/db.js";

class StudentRepository extends BaseRepository {
  constructor() {
    super("students", studentDbAdapter);
  }
  create(data) {
    const studentData = JSON.parse(JSON.stringify(data));
    delete studentData.students;
    delete studentData.password;
    delete studentData.role;
    delete studentData.specialization;
    studentData.isActive = true;
    const list = this.dbContext.push(studentData).write();
    return list.find((it) => it.id === data.id);
  }
  update(id, dataToUpdate) {
    const studentData = JSON.parse(JSON.stringify(dataToUpdate));
    delete studentData.students;
    delete studentData.password;
    delete studentData.role;
    delete studentData.specialization;
    return this.dbContext.find({ id }).assign(studentData).write();
  }
}

const studentRepository = new StudentRepository();

export { studentRepository };
