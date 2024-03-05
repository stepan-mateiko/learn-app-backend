import { BaseRepository } from "./baseRepository.js";
import { trainerDbAdapter } from "../config/db.js";

class TrainerRepository extends BaseRepository {
  constructor() {
    super("trainers", trainerDbAdapter);
  }
  create(data) {
    const trainerData = JSON.parse(JSON.stringify(data));
    delete trainerData.trainers;
    delete trainerData.password;
    delete trainerData.role;
    delete trainerData.dob;
    delete trainerData.address;
    trainerData.isActive = true;
    const list = this.dbContext.push(trainerData).write();
    return list.find((it) => it.id === data.id);
  }
  update(id, dataToUpdate) {
    const trainerData = JSON.parse(JSON.stringify(dataToUpdate));
    delete trainerData.trainers;
    delete trainerData.password;
    delete trainerData.role;
    delete trainerData.dob;
    delete trainerData.address;
    return this.dbContext.find({ id }).assign(trainerData).write();
  }
}

const trainerRepository = new TrainerRepository();

export { trainerRepository };
