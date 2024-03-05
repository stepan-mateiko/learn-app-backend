import { BaseRepository } from "./baseRepository.js";
import { trainingTypeDbAdapter } from "../config/db.js";

class TrainingTypeRepository extends BaseRepository {
  constructor() {
    super("trainingTypes", trainingTypeDbAdapter);
  }
}

const trainingTypeRepository = new TrainingTypeRepository();

export { trainingTypeRepository };
