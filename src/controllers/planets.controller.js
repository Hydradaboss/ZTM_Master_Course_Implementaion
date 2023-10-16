import { habitablePlanets as planet } from "../models/planets.model.js";

export const getAllPlanets = (req, res) => {
  return res.status().json(planet);
};
