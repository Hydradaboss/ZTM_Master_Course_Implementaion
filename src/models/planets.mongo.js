import mongoose from "mongoose";

const planetSchema = new mongoose.Schema({
  Name: { type: String, required: true },
});

export const planetModel = mongoose.model("Planet", planetSchema);
