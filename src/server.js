import http from "http";
import app from "./apps.js";
import { loadPlanetsData } from "./models/planets.model.js";
import { connectDb } from "./Database/connectDb.js";
import "dotenv/config.js"


const server = http.createServer(app);
await loadPlanetsData()
await connectDb(process.env.MONGO_url);
server.listen(process.env.PORT,()=>{
    console.log("connected on port 3000")
});
