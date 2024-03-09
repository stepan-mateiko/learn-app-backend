// repositories/userRepository.js
import { v4 } from "uuid";
import { client } from "../db/db.js";

class TrainingRepository {
  constructor() {
    this.collection = client.db("Learn-app").collection("Trainings");
  }

  getAll() {
    return this.collection.find().toArray();
  }
  getOne(search) {
    return this.collection.findOne(search);
  }

  create(data) {
    data.ID = v4();
    return this.collection.insertOne(data);
  }

  delete(ID) {
    return this.collection.deleteOne({ ID });
  }
}

const trainingRepository = new TrainingRepository();

export { trainingRepository };

// import { BaseRepository } from "./baseRepository.js";
// import { v4 } from "uuid";
// import { trainingDbAdapter } from "../config/db.js";

// class TrainingRepository extends BaseRepository {
//   constructor() {
//     super("trainings", trainingDbAdapter);
//   }
//   generateId() {
//     return v4();
//   }
//   create(data) {
//     data.id = this.generateId();
//     const list = this.dbContext.push(data).write();
//     return list.find((it) => it.id === data.id);
//   }
// }

// const trainingRepository = new TrainingRepository();

// export { trainingRepository };
