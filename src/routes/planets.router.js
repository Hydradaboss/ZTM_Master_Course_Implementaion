import express from "express";
import { HttpGetAllPlanets } from "../controllers/planets.controller.js";
const planetRouter = express.Router();

planetRouter.get("/", HttpGetAllPlanets);

export default planetRouter;
