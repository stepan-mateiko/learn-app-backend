import { client } from "../db/db.js";

class TrainingTypeRepository {
  constructor() {
    this.collection = client.db("Learn-app").collection("TrainingTypes");
  }
  getAll() {
    return this.collection.find().toArray();
  }
}

const trainingTypeRepository = new TrainingTypeRepository();

export { trainingTypeRepository };
