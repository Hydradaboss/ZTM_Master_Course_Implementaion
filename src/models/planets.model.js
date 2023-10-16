import { parse } from "csv-parse";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import {dirname} from "path";
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const getHabitablePlanets = [];

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname,"..","data","kepler_data.csv"))
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", (data) => {
        if (isHabitablePlanet(data)) {
          getHabitablePlanets.push(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", () => {
        console.log(`${getHabitablePlanets.length} habitable planets found!`);
        resolve();
      });
  });
}
export { getHabitablePlanets, loadPlanetsData };
