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

// import { trainingRepository } from "../repositories/trainingRepository.js";

// class TrainingService {
//   getAllTrainings() {
//     const item = trainingRepository.getAll();
//     if (!item) {
//       return null;
//     }
//     return item;
//   }
//   addTraining(data) {
//     const item = trainingRepository.create(data);
//     if (!item) {
//       return null;
//     }
//     return item;
//   }
//   removeTraining(id) {
//     const item = trainingRepository.delete(id);

//     if (item.length < 1) {
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

// const trainingService = new TrainingService();

// export { trainingService };
