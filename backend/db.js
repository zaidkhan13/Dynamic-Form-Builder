import mongoose from "mongoose"; // imports the Mongoose library
import dotenv from "dotenv";

dotenv.config();
const mongoURI = process.env.MONGO_URI  // URI used to connect to the MongoDB database.

async function connectToDatabase() {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB Successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// Export the function
export default connectToDatabase;