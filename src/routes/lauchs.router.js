import express from express
import { HttpGetAllLauches } from "../controllers/launchs.controller"
const launchsRouter = express.Router()

launchsRouter.get("",HttpGetAllLauches)
export default launchsRouter