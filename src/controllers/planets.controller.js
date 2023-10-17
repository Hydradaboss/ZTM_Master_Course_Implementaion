import  getHabitablePlanets from "../models/planets.model.js";

const planet = getHabitablePlanets
export const HttpGetAllPlanets = (req, res) => {
  return res.status(200).json(planet);
};
