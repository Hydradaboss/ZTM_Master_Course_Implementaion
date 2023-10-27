import { parse } from "csv-parse";
import fs from "fs";
import path from "path";
import { planetModel } from "./planets.mongo.js";

const __filename = process.argv[1];
const __dirname = path.dirname(__filename);

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

export function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname,"..", "..","..", "data", "kepler_data.csv"))
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        if (isHabitablePlanet(data)) {
          await upsert(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", async () => {
        console.log("habitable planets found!");
        resolve();
      });
  });
}

const upsert = async (data) => {
  await planetModel.updateOne(
    {
      Name: data.kepler_name,
    },
    {
      Name: data.kepler_name,
    },
    {
      upsert: true,
    }
  );
};

export const getallPlanets = async () => {
  return await planetModel.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
};
