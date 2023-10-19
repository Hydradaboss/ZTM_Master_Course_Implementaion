import { LaunchModel } from "./launchs.mongo.js";
import { planetModel } from "./planets.mongo.js";

const launchs = new Map();

let latestFlightNumber = 100
const DEFAULT = 100
const launch = {
  FlightNumber: 100,
  Mission: "Kepler Space Exploration",
  Rocket: "Explorer IS1",
  LaunchDate: new Date("December  22, 2050"),
  Destination: "Kepler-422 b",
  Customers: ["ZTM", "NASA"],
  Upcoming: true,
  Success: true,
};
SaveLaunch(launch)
async function SaveLaunch(Launch){
  const existingPlanet = await planetModel.findOne({KeplerName:Launch.Destination})
  if(!existingPlanet){
    throw new Error("No destination planet found")
  }
  await LaunchModel.updateOne({
    FlightNumber: Launch.FlightNumber
  },launch,{
    upsert:true
  })
}


export const getAllLauches = async () => {
  return await LaunchModel.find({},{"_id":0,"__v":0})
};

export const CreateNewLaunch = (Launch) => {
  latestFlightNumber++;
  launchs.set(latestFlightNumber, Object.assign(Launch, {
    FlightNumber: latestFlightNumber,
    Customers: ["ZTM", "NASA"],
    Upcoming: true,
    Sucess:true
  }));
} ;

const getLatestFlightNumber = async ()=>{
  const latestLauch = await LaunchModel.findOne().sort("-FlightNumber")
  if(!latestLauch){
    return DEFAULT
  }

  return latestLauch.FlightNumber
}
export const DeleteLaunch = (LaunchId) => {
  const aborted = launchs.has(LaunchId)
  aborted.Upcoming = false
  aborted.Sucess = false
  return aborted
}

export const DoesIdExist = (LaunchId) =>{
  return launchs.has(LaunchId) 
}

