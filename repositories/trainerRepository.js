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
