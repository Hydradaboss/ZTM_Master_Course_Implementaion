import http from "http";
import app from "./apps.js";
import { loadPlanetsData } from "./models/planets.model.js";
import { connectDb } from "./Database/connectDb.js";
import "dotenv/config.js";
import {loadLauchData} from "./models/launchs.model.js"
const server = http.createServer(app);
const start = async () => {
  try {
    await connectDb(process.env.MONGO_URL);
    await loadPlanetsData();
    await loadLauchData()
    server.listen(process.env.PORT, () => {
      console.log("connected on port 3000");
    });
  } catch (error) {
    console.log(error)
  }
};

start()