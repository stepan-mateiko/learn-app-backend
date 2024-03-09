import { client } from "../db/db.js";

class TrainerRepository {
  constructor() {
    this.collection = client.db("Learn-app").collection("Trainers");
  }

  getAll() {
    return this.collection.find().toArray();
  }
  getOne(search) {
    return this.collection.findOne(search);
  }
  create(data) {
    const trainerData = JSON.parse(JSON.stringify(data));
    delete trainerData.trainers;
    delete trainerData.password;
    delete trainerData.role;
    delete trainerData.dob;
    delete trainerData.address;
    trainerData.isActive = true;
    trainerData.students = [];
    trainerData.trainings = [];
    return this.collection.insertOne(trainerData);
  }

  update(ID, dataToUpdate) {
    const trainerData = JSON.parse(JSON.stringify(dataToUpdate));
    delete trainerData.trainers;
    delete trainerData.password;
    delete trainerData.role;
    delete trainerData.dob;
    delete trainerData.address;
    delete trainerData._id;
    return this.collection.findOneAndUpdate(
      { ID },
      { $set: trainerData },
      { returnDocument: "after" }
    );
  }
  delete(ID) {
    return this.collection.deleteOne({ ID });
  }
}

const trainerRepository = new TrainerRepository();

export { trainerRepository };

// //
// import { BaseRepository } from "./baseRepository.js";
// import { trainerDbAdapter } from "../config/db.js";

// class TrainerRepository extends BaseRepository {
//   constructor() {
//     super("trainers", trainerDbAdapter);
//   }
//   create(data) {
//     const trainerData = JSON.parse(JSON.stringify(data));
//     delete trainerData.trainers;
//     delete trainerData.password;
//     delete trainerData.role;
//     delete trainerData.dob;
//     delete trainerData.address;
//     trainerData.isActive = true;
//     const list = this.dbContext.push(trainerData).write();
//     return list.find((it) => it.id === data.id);
//   }
//   update(id, dataToUpdate) {
//     const trainerData = JSON.parse(JSON.stringify(dataToUpdate));
//     delete trainerData.trainers;
//     delete trainerData.password;
//     delete trainerData.role;
//     delete trainerData.dob;
//     delete trainerData.address;
//     return this.dbContext.find({ id }).assign(trainerData).write();
//   }
// }

// const trainerRepository = new TrainerRepository();

// export { trainerRepository };
