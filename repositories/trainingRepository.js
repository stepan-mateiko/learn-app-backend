import { BaseRepository } from "./baseRepository.js";
import { v4 } from "uuid";
import { trainingDbAdapter } from "../config/db.js";

class TrainingRepository extends BaseRepository {
  constructor() {
    super("trainings", trainingDbAdapter);
  }
  generateId() {
    return v4();
  }
  create(data) {
    data.id = this.generateId();
    const list = this.dbContext.push(data).write();
    return list.find((it) => it.id === data.id);
  }
}

const trainingRepository = new TrainingRepository();

export { trainingRepository };
