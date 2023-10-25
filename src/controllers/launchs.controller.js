import {
  getAllLauches,
  CreateNewLaunch,
  DeleteLaunch,
  DoesIdExist,
} from "../models/launchs.model.js";

import { getPag } from "../services/pagination.js";

export const HttpGetAllLauches = async (req, res) => {
  const {skip, limit} = getPag(req.query)
  return res.status(200).json(await getAllLauches(skip, limit));
};

export const HttpCreateLaunch = async (req, res) => {
  const { Mission, Rocket, LaunchDate, Destination } = req.body;
  const Launch = { Mission, Rocket, LaunchDate, Destination };
  if (
    !Launch.Mission ||
    !Launch.Rocket ||
    !Launch.LaunchDate ||
    !Launch.Destination
  ) {
    return res.status(400).json({
      error: "Missing Required Parameters",
    });
  }
  Launch.LaunchDate = new Date(Launch.LaunchDate);
  if (isNaN(Launch.LaunchDate)) {
    return res.status(400).json({
      error: "Date is not correct",
    });
  }
  await CreateNewLaunch(Launch);
  return res.status(201).json(Launch);
};

export const HttpDeleteLaunch = async (req, res) => {
  const LaunchId = req.params.id;
  if (!(await DoesIdExist(LaunchId))) {
    return res.status(400).json({
      error: "launch not found",
    });
  }
  const aborted = await DeleteLaunch(LaunchId);
  return res.status(200).json(aborted);
};
