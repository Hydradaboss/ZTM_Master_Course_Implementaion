import express from "express"
import cors from "cors"
import morgan from "morgan"
import planetRouter from "./routes/planets.router.js"
import launchsRouter from "./routes/lauchs.router.js";

const app = express();
app.use(cors());
app.use(morgan("combined"))
app.use("/planet", planetRouter)
app.use("/launch",launchsRouter)

export default app