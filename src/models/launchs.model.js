import axios from "axios";
import { LaunchModel } from "./launchs.mongo.js";
import { planetModel } from "./planets.mongo.js";

const DEFAULT = 1;

async function SaveLaunch(Launch) {
  await LaunchModel.findOneAndUpdate(
    {
      FlightNumber: Launch.FlightNumber,
    },
    Launch,
    {
      upsert: true,
    }
  );
}

export const getAllLauches = async (skip, limit) => {
  return await LaunchModel.find({}, { _id: 0, __v: 0 })
    .sort({ FlightNumber: 1 })
    .skip(skip)
    .limit(limit);
};

export const CreateNewLaunch = async (Launch) => {
  const existingPlanet = await planetModel.findOne({
    Name: Launch.Destination,
  });
  if (!existingPlanet) {
    throw new Error("No destination planet found");
  }
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

const findLaunchs = async (filter) => {
  return await LaunchModel.findOne(filter);
};

export const DoesIdExist = async (LaunchId) => {
  return await findLaunchs({
    FlightNumber: LaunchId,
  });
};

export const loadLauchData = async () => {
  try {
    const filtered = await findLaunchs({
      FlightNumber: 1,
    });
    if (filtered) {
      console.log("exists");
    } else {
      const response = await axios.post(
        "https://api.spacexdata.com/v4/launches/query",
        {
          query: {},
          options: {
            pagination: false,
            populate: [
              {
                path: "rocket",
                select: {
                  name: 1,
                },
              },
              {
                path: "payloads",
                select: {
                  customers: 1,
                },
              },
            ],
          },
        }
      );
      const launchdocs = response.data.docs;
      for (const launchdoc of launchdocs) {
        const payloads = launchdoc["payloads"];
        const customer = payloads.flatMap((payload) => {
          return payload["customers"];
        });
        const loadedLaunch = {
          FlightNumber: launchdoc["flight_number"],
          Mission: launchdoc["name"],
          Rocket: launchdoc["rocket"]["name"],
          Upcoming: launchdoc["upcoming"],
          LaunchDate: launchdoc["date_local"],
          Success: launchdoc["success"],
          Customers: customer,
        };
        await SaveLaunch(loadedLaunch);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
