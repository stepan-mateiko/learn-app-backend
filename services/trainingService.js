import { trainingRepository } from "../repositories/trainingRepository.js";

class TrainingService {
  getAllTrainings() {
    return trainingRepository.getAll();
  }
  addTraining(data) {
    return trainingRepository.create(data);
  }

  getOneTraining(search) {
    return trainingRepository.getOne(search);
  }
  removeTraining(id) {
    return trainingRepository.delete(id);
  }
}

const trainingService = new TrainingService();

export { trainingService };
