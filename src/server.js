import http from "http";
import app from "./apps.js";
import { loadPlanetsData } from "./models/planets.model.js";
import { connectDb } from "./Database/connectDb.js";
import "dotenv/config.js";

const server = http.createServer(app);
await loadPlanetsData();
const start = async () => {
  try {
    await connectDb(process.env.MONGO_URL);
    server.listen(process.env.PORT, () => {
      console.log("connected on port 3000");
    });
  } catch (error) {}
};

start()