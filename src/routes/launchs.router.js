import express from "express"
import {
  HttpGetAllLauches,
  HttpCreateLaunch,
  HttpDeleteLaunch,
} from "../controllers/launchs.controller.js";
const launchsRouter = express.Router()

launchsRouter.get("/",HttpGetAllLauches)
launchsRouter.post("/", HttpCreateLaunch)
launchsRouter.delete("/:id", HttpDeleteLaunch);
export default launchsRouter