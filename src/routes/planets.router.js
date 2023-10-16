import express from "express";
import { getAllPlanets } from "../controllers/planets.controller.js";
const planetRouter = express.Router();

planetRouter.get("/", getAllPlanets);

export default planetRouter;
