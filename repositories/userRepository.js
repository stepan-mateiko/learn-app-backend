import { client } from "../db/db.js";

class UserRepository {
  constructor() {
    this.collection = client.db("Learn-app").collection("Users");
  }

  getAll() {
    return this.collection.find().toArray();
  }
  getOne(search) {
    return this.collection.findOne(search);
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
    return this.collection.insertOne(userData);
  }

  update(ID, dataToUpdate) {
    const userData = JSON.parse(JSON.stringify(dataToUpdate));
    delete userData.trainers;
    delete userData.students;
    delete userData.dob;
    delete userData.address;
    delete userData.trainings;
    delete userData.isActive;
    delete userData.specialization;
    delete userData._id;
    return this.collection.findOneAndUpdate(
      { ID },
      { $set: userData },
      { returnDocument: "after" }
    );
  }
  delete(ID) {
    return this.collection.deleteOne({ ID });
  }
}

const userRepository = new UserRepository();

export { userRepository };
