import { userRepository } from "../repositories/userRepository.js";

class UserService {
  getAllUsers() {
    const item = userRepository.getAll();
    if (!item) {
      return null;
    }
    return item;
  }
  addUser(data) {
    const item = userRepository.create(data);
    if (!item) {
      return null;
    }
    return item;
  }
  updateUser(id, dataToUpdate) {
    const item = userRepository.update(id, dataToUpdate);
    if (!item) {
      return null;
    }
    return item;
  }
  removeUser(id) {
    const item = userRepository.delete(id);
    if (item.length < 1) {
      return null;
    }
    return item;
  }
  getOneUser(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  checkIfRightField(model, object) {
    for (const key in object) {
      if (Object.hasOwnProperty.call(object, key)) {
        if (key === "id") {
          continue;
        }
        if (!(key in model)) {
          throw new Error(`${key} must not be`);
        }
      }
    }
  }
}

const userService = new UserService();

export { userService };
