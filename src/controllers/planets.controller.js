import { getHabitablePlanets as planet } from "../models/planets.model.js";

export const HttpGetAllPlanets = (req, res) => {
  return res.status().json(planet);
};
