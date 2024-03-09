// services/userService.js

import { userRepository } from "../repositories/userRepository.js";

class UserService {
  getAllUsers() {
    return userRepository.getAll();
  }

  addUser(data) {
    return userRepository.create(data);
  }
  updateUser(id, dataToUpdate) {
    return userRepository.update(id, dataToUpdate);
  }
  getOneUser(search) {
    return userRepository.getOne(search);
  }
  removeUser(id) {
    return userRepository.delete(id);
  }
}

const userService = new UserService();

export { userService };
// import { userRepository } from "../repositories/userRepository.js";
// import { database } from "../db/db.js";

// class UserService {
//   getAllUsers() {
//     const item = database.collection("Users");
//     if (!item) {
//       return null;
//     }
//     return item;
//   }
//   addUser(data) {
//     const item = userRepository.create(data);
//     if (!item) {
//       return null;
//     }
//     return item;
//   }
//   updateUser(id, dataToUpdate) {
//     const item = userRepository.update(id, dataToUpdate);
//     if (!item) {
//       return null;
//     }
//     return item;
//   }
//   removeUser(id) {
//     const item = userRepository.delete(id);
//     if (item.length < 1) {
//       return null;
//     }
//     return item;
//   }
//   getOneUser(search) {
//     const item = userRepository.getOne(search);
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

// const userService = new UserService();

// export { userService };
