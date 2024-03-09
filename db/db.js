import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://uchihayankee:Walinor99@cluster0.aim8grx.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB database");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export { client, connectToDatabase };
