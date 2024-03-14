import { specializationRepository } from "../repositories/specializationRepository.js";

class SpecializationService {
  getAllSpecializations() {
    return specializationRepository.getAll();
  }
}

const specializationService = new SpecializationService();

export { specializationService };
