import mongoose from "mongoose";

export const connectDb = (url) => {
  mongoose.connection.once("open", () => {
    console.log("connected to db");
  });
  mongoose.connection.on("error", (error) => {
    console.error(error);
  });
  return mongoose.connect(url);
};

export const disconnectDb = () => {
  return mongoose.disconnect()
}