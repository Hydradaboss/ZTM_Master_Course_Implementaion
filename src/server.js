import http from "http";
import { loadPlanetsData } from "./models/planets.model.js";
import app from "./apps.js";
const PORT = 3000
const server = http.createServer(app);
await loadPlanetsData()
server.listen(PORT,()=>{
    console.log("connected on port 3000")
});
