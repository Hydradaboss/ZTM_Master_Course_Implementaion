import mongoose from "mongoose";

const LaunchSchema = new mongoose.Schema({
  FlightNumber: {
    type: String,
    required: true,
    default: 100,
  },
  Mission: {
    type: String,
    required: true,
  },
  Rocket: {
    type: String,
    required: true,
  },
  LaunchDate: {
    type: Date,
    required: true,
  },
  Destination: {
    type: String,
    required: true,
  },
  Customers: {
    type: Array,
    required: true,
  },
  Upcoming: {
    type: Boolean,
    required: true,
  },
  Success: {
    type: Boolean,
    required: true,
  },
});

export const LaunchModel = mongoose.model("Launch", LaunchSchema);
