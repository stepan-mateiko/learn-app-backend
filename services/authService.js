import { userService } from "./userService.js";

class AuthService {
  login(userData) {
    const users = userService.getAllUsers();

    const existingUser = users.find(
      (user) => user.userName === userData.userName
    );

    if (!existingUser) {
      throw new Error("User not found");
    }

    if (existingUser.password !== userData.password) {
      throw new Error("Password incorrect");
    }

    return existingUser;
  }
}

const authService = new AuthService();

export { authService };
