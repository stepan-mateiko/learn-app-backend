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
