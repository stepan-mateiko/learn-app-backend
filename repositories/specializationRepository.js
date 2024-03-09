// repositories/userRepository.js

import { client } from "../db/db.js";

class SpecializationRepository {
  constructor() {
    this.collection = client.db("Learn-app").collection("Specializations");
  }
  getAll() {
    return this.collection.find().toArray();
  }
}

const specializationRepository = new SpecializationRepository();

export { specializationRepository };
// import { BaseRepository } from "./baseRepository.js";
// import { specializationDbAdapter } from "../config/db.js";

// class SpecializationRepository extends BaseRepository {
//   constructor() {
//     super("specializations", specializationDbAdapter);
//   }
// }

// const specializationRepository = new SpecializationRepository();

// export { specializationRepository };
