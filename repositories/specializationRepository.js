import { BaseRepository } from "./baseRepository.js";
import { specializationDbAdapter } from "../config/db.js";

class SpecializationRepository extends BaseRepository {
  constructor() {
    super("specializations", specializationDbAdapter);
  }
}

const specializationRepository = new SpecializationRepository();

export { specializationRepository };
