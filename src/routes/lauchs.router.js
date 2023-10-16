import express from "express"
import { HttpGetAllLauches } from "../controllers/launchs.controller.js"
const launchsRouter = express.Router()

launchsRouter.get("",HttpGetAllLauches)
export default launchsRouter