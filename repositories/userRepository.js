import { BaseRepository } from "./baseRepository.js";

class UserRepository extends BaseRepository {
  constructor() {
    super("users");
  }
  create(data) {
    const userData = JSON.parse(JSON.stringify(data));
    delete userData.trainers;
    delete userData.students;
    delete userData.dob;
    delete userData.address;
    delete userData.trainings;
    delete userData.isActive;
    delete userData.specialization;
    const list = this.dbContext.push(userData).write();

    return list.find((it) => it.id === data.id);
  }
  update(id, dataToUpdate) {
    const userData = JSON.parse(JSON.stringify(dataToUpdate));
    delete userData.trainers;
    delete userData.students;
    delete userData.dob;
    delete userData.address;
    delete userData.trainings;
    delete userData.isActive;
    delete userData.specialization;
    return this.dbContext.find({ id }).assign(userData).write();
  }
}

const userRepository = new UserRepository();

export { userRepository };
