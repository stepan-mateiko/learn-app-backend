import { userService } from "./userService.js";

class AuthService {
  async login(userData) {
    try {
      const users = await userService.getAllUsers();
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
    } catch (error) {}
  }
}

const authService = new AuthService();

export { authService };
