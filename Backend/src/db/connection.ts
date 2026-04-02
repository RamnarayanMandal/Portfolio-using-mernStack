import mongoose from "mongoose";

const connectDb = async (): Promise<void> => {
  try {
    const uri = process.env.MONGO_URL;
    if (!uri) {
      throw new Error("MONGO_URL is not set");
    }
    const connect = await mongoose.connect(uri);
    console.log(
      "Hi, Portfolio! You connected with database:",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDb;
