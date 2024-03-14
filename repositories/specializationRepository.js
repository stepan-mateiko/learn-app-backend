import { client } from "../db/db.js";

class SpecializationRepository {
  constructor() {
    this.collection = client.db("Learn-app").collection("Specializations");
  }
  getAll() {
    return this.collection.find().toArray();
  }
}

const specializationRepository = new SpecializationRepository();

export { specializationRepository };
