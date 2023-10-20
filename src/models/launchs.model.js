import { LaunchModel } from "./launchs.mongo.js";
import { planetModel } from "./planets.mongo.js";

const DEFAULT = 100;

async function SaveLaunch(Launch) {
  const existingPlanet = await planetModel.findOne({
    KeplerName: Launch.Destination,
  });
  if (!existingPlanet) {
    throw new Error("No destination planet found");
  }
  await LaunchModel.findOneAndUpdate(
    {
      FlightNumber: Launch.FlightNumber,
    },
    Launch,
    {
      upsert: true,
    }
  );
};
export const getAllLauches = async () => {
  return await LaunchModel.find({}, { _id: 0, __v: 0 });
};
export const CreateNewLaunch = async (Launch) => {
  const currentFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLauch = Object.assign(Launch, {
    FlightNumber: currentFlightNumber,
    Customers: ["ZTM", "NASA"],
    Upcoming: true,
    Sucess: true,
  });

  await SaveLaunch(newLauch);
};
const getLatestFlightNumber = async () => {
  const latestLauch = await LaunchModel.findOne().sort("-FlightNumber");
  if (!latestLauch) {
    return DEFAULT;
  }

  return latestLauch.FlightNumber;
};
export const DeleteLaunch = async (LaunchId) => {
  return await LaunchModel.updateOne(
    {
      FlightNumber: LaunchId,
    },
    {
      Upcoming: false,
      Sucess: false,
    }
  );
};
export const DoesIdExist = async (LaunchId) => {
  return await LaunchModel.findOne({
    FlightNumber: LaunchId,
  });
};