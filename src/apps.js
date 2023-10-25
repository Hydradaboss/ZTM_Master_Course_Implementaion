import express from "express"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"
import planetRouter from "./routes/planets.router.js"
import launchsRouter from "./routes/launchs.router.js";

const app = express();
app.use(helmet())
app.use(cors());
app.use(express.json())
app.use(morgan("combined"))
app.use("/planet", planetRouter)
app.use("/launch",launchsRouter)

export default app