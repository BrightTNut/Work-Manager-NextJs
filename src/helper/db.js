import mongoose from "mongoose";
import { User } from "../models/user";
const config = {
  isConnected: 0,
};
export const connectDb = async () => {
  if (config.isConnected) {
    return;
  }
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_DB_URL, {
      dbName: "blogwebpage",
    });

    console.log("user data saved!!!");
    console.log("DB connected ....");
    console.log(connection.readyState);
    config.isConnected = connection.readyState;
  } catch (error) {
    console.log("Fail to connect to DB....", error);
  }
};
