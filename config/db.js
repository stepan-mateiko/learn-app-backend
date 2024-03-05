import Low from "lowdb";
import FileSync from "lowdb/adapters/FileSync.js";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, "database.json");
const userDbPath = join(__dirname, "userDatabase.json");
const trainerDbPath = join(__dirname, "trainerDatabase.json");
const trainingDbPath = join(__dirname, "trainingDatabase.json");
const studentDbPath = join(__dirname, "studentDatabase.json");
const specializationDbPath = join(__dirname, "specializationDatabase.json");
const trainingTypeDbPath = join(__dirname, "trainingTypeDatabase.json");

const adapter = new FileSync(dbPath);
const userAdapter = new FileSync(userDbPath);
const trainerAdapter = new FileSync(trainerDbPath);
const trainingAdapter = new FileSync(trainingDbPath);
const studentAdapter = new FileSync(studentDbPath);
const specializationAdapter = new FileSync(specializationDbPath);
const trainingTypeAdapter = new FileSync(trainingTypeDbPath);

const dbAdapter = Low(adapter);
const userDbAdapter = Low(userAdapter);
const trainerDbAdapter = Low(trainerAdapter);
const trainingDbAdapter = Low(trainingAdapter);
const studentDbAdapter = Low(studentAdapter);
const specializationDbAdapter = Low(specializationAdapter);
const trainingTypeDbAdapter = Low(trainingTypeAdapter);

const DEFAULT_DB = { students: [], trainings: [] };
const USER_DB = { users: [] };
const TRAINER_DB = { trainers: [] };
const TRAINING_DB = { trainings: [] };
const STUDENT_DB = { students: [] };
const SPECIALIZATION_DB = { specializations: [] };
const TRAINING_TYPE_DB = { trainingTypes: [] };

dbAdapter.defaults(DEFAULT_DB).write();
userDbAdapter.defaults(USER_DB).write();
trainerDbAdapter.defaults(TRAINER_DB).write();
trainingDbAdapter.defaults(TRAINING_DB).write();
studentDbAdapter.defaults(STUDENT_DB).write();
specializationDbAdapter.defaults(SPECIALIZATION_DB).write();
trainingTypeDbAdapter.defaults(TRAINING_TYPE_DB).write();

export {
  dbAdapter,
  userDbAdapter,
  trainerDbAdapter,
  trainingDbAdapter,
  studentDbAdapter,
  specializationDbAdapter,
  trainingTypeDbAdapter,
};
