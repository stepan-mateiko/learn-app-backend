import { trainingTypeRepository } from "../repositories/trainingTypeRepository.js";

class TrainingTypeService {
  getAllTrainingTypes() {
    const item = trainingTypeRepository.getAll();
    if (!item) {
      return null;
    }
    return item;
  }
}

const trainingTypeService = new TrainingTypeService();

export { trainingTypeService };
