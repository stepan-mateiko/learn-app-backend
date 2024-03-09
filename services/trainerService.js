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

// import { trainerRepository } from "../repositories/trainerRepository.js";

// class TrainerService {
//   getAllTrainers() {
//     const item = trainerRepository.getAll();
//     if (!item) {
//       return null;
//     }
//     return item;
//   }
//   addTrainer(data) {
//     const item = trainerRepository.create(data);
//     if (!item) {
//       return null;
//     }
//     return item;
//   }

//   updateTrainer(id, dataToUpdate) {
//     const item = trainerRepository.update(id, dataToUpdate);

//     if (!item) {
//       return null;
//     }
//     return item;
//   }

//   removeTrainer(id) {
//     const item = trainerRepository.delete(id);

//     if (item.length < 1) {
//       return null;
//     }
//     return item;
//   }

//   searchTrainer(search) {
//     const item = trainerRepository.getOne(search);
//     if (!item) {
//       return null;
//     }
//     return item;
//   }

//   checkIfRightField(model, object) {
//     for (const key in object) {
//       if (Object.hasOwnProperty.call(object, key)) {
//         if (key === "id") {
//           continue;
//         }
//         if (!(key in model)) {
//           throw new Error(`${key} must not be`);
//         }
//       }
//     }
//   }
// }

// const trainerService = new TrainerService();

// export { trainerService };
