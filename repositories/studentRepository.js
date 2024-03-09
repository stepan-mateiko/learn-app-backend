import { client } from "../db/db.js";

class StudentRepository {
  constructor() {
    this.collection = client.db("Learn-app").collection("Students");
  }

  getAll() {
    return this.collection.find().toArray();
  }
  getOne(search) {
    return this.collection.findOne(search);
  }
  create(data) {
    const studentData = JSON.parse(JSON.stringify(data));
    delete studentData.students;
    delete studentData.password;
    delete studentData.role;
    delete studentData.specialization;
    studentData.isActive = true;
    studentData.trainers = [];
    studentData.trainings = [];
    return this.collection.insertOne(studentData);
  }

  update(ID, dataToUpdate) {
    const studentData = JSON.parse(JSON.stringify(dataToUpdate));
    delete studentData.students;
    delete studentData.password;
    delete studentData.role;
    delete studentData.specialization;
    delete studentData._id;
    return this.collection.findOneAndUpdate(
      { ID },
      { $set: studentData },
      { returnDocument: "after" }
    );
  }
  delete(ID) {
    return this.collection.deleteOne({ ID });
  }
}

const studentRepository = new StudentRepository();

export { studentRepository };

// import { BaseRepository } from "./baseRepository.js";
// import { studentDbAdapter } from "../config/db.js";

// class StudentRepository extends BaseRepository {
//   constructor() {
//     super("students", studentDbAdapter);
//   }
//   create(data) {
//     const studentData = JSON.parse(JSON.stringify(data));
//     delete studentData.students;
//     delete studentData.password;
//     delete studentData.role;
//     delete studentData.specialization;
//     studentData.isActive = true;
//     const list = this.dbContext.push(studentData).write();
//     return list.find((it) => it.id === data.id);
//   }
//   update(id, dataToUpdate) {
//     const studentData = JSON.parse(JSON.stringify(dataToUpdate));
//     delete studentData.students;
//     delete studentData.password;
//     delete studentData.role;
//     delete studentData.specialization;
//     return this.dbContext.find({ id }).assign(studentData).write();
//   }
// }

// const studentRepository = new StudentRepository();

// export { studentRepository };
