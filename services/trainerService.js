import { trainerRepository } from "../repositories/trainerRepository.js";

class TrainerService {
  getAllTrainers() {
    return trainerRepository.getAll();
  }
  addTrainer(data) {
    return trainerRepository.create(data);
  }
  updateTrainer(id, dataToUpdate) {
    return trainerRepository.update(id, dataToUpdate);
  }
  getOneTrainer(search) {
    return trainerRepository.getOne(search);
  }
  removeTrainer(id) {
    return trainerRepository.delete(id);
  }
}

const trainerService = new TrainerService();

export { trainerService };
