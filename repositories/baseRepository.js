import { userDbAdapter } from "../config/db.js";

class BaseRepository {
  constructor(collectionName, customAdapter = userDbAdapter) {
    this.dbContext = customAdapter.get(collectionName);
    this.collectionName = collectionName;
  }
  generateUserName(userFirstName, userLastName) {
    return `${userFirstName}-${userLastName}`.toLowerCase();
  }

  getAll() {
    return this.dbContext.value();
  }

  getOne(search) {
    return this.dbContext.find(search).value();
  }

  update(id, dataToUpdate) {
    return this.dbContext.find({ id }).assign(dataToUpdate).write();
  }

  delete(id) {
    return this.dbContext.remove({ id }).write();
  }
}

export { BaseRepository };
