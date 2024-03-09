import { trainingTypeRepository } from "../repositories/trainingTypeRepository.js";

class TrainingTypeService {
  getAllTrainingTypes() {
    return trainingTypeRepository.getAll();
  }
}

const trainingTypeService = new TrainingTypeService();

export { trainingTypeService };
