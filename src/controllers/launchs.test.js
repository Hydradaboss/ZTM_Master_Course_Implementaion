import request from "supertest";
import app from "../apps.js";
import { connectDb } from "../services/connectDb.js";
import { loadPlanetsData } from "../models/planets.model.js";
import "dotenv/config.js";
describe(" test all", () => {
  beforeAll(async () => {
    const url = process.env.MONGO_URL;
    await connectDb(url);
    //await loadPlanetsData();
  });

  describe("Test Get Launchs", () => {
    test("it should respond with 200", async () => {
      await request(app).get("/launch").expect(200);
    });
  });

  describe("Test Post Launchs", () => {
    const completeData = {
      Mission: "Kepler Space Exploration",
      Rocket: "Explorer IS1",
      Destination: "Kepler-1649 b",
      LaunchDate: "January 4, 2029",
    };

    const completeDataWithInvalidDate = {
      Mission: "Kepler Space Exploration",
      Rocket: "Explorer IS1",
      Destination: "Kepler-1649 b",
      LaunchDate: "None",
    };
    const completeDataWithoutDate = {
      Mission: "Kepler Space Exploration",
      Rocket: "Explorer IS1",
      Destination: "Kepler-1649 b",
    };
    test("it should respond with 200", async () => {
      const response = await request(app)
        .post("/launch")
        .send(completeData)
        .expect(201);
      const requestDate = new Date(completeData.LaunchDate).valueOf();
      const responseDate = new Date(response.body.LaunchDate).valueOf();
      expect(responseDate).toBe(requestDate);
      expect(response.body).toMatchObject(completeDataWithoutDate);
    });
    test("it should catch missing propertise", async () => {
      const response = await request(app)
        .post("/launch")
        .send(completeDataWithoutDate)
        .expect(400);
      expect(response.body).toStrictEqual({
        error: "Missing Required Parameters",
      });
    });

    test("it should catch invalid dates", async () => {
      const response = await request(app)
        .post("/launch")
        .send(completeDataWithInvalidDate)
        .expect(400);
      expect(response.body).toStrictEqual({
        error: "Date is not correct",
      });
    });
  });
});
