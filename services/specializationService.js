import { specializationRepository } from "../repositories/specializationRepository.js";

class SpecializationService {
  getAllSpecializations() {
    return specializationRepository.getAll();
  }
}

const specializationService = new SpecializationService();

export { specializationService };

// class SpecializationService {
//   getAllSpecializations() {
//     const item = specializationRepository.getAll();
//     if (!item) {
//       return null;
//     }
//     return item;
//   }
// }

// const specializationService = new SpecializationService();

// export { specializationService };
