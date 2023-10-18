import  {getallPlanets } from "../models/planets.model.js";
export const HttpGetAllPlanets = async(req, res) => {
  return res.status(200).json(await getallPlanets());
};
