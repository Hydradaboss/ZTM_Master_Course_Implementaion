import request from "supertest";
import app from "../apps.js";

describe("Test Get Launchs", () => {
  test("it should respond with 200", async () => {
    await request(app).get("/launch").expect(200);
  });
});

describe("Test Post Launchs", () => {
  const completeData = {
    Mission: "Kepler Space Exploration",
    Rocket: "Explorer IS1",
    Destination: "Kepler-422 b",
    LaunchDate: "January 4, 2029",
  };
  const completeDataWithoutDate = {
    Mission: "Kepler Space Exploration",
    Rocket: "Explorer IS1",
    Destination: "Kepler-422 b",
  };
  test("it should respond with 200", async () => {
    const response = await request(app).post("/launch").send(completeData).expect(201);
    const requestDate = new Date(completeData.LaunchDate).valueOf();
    const responseDate = new Date(response.body.LaunchDate).valueOf();
    expect(responseDate).toBe(requestDate);
    expect(response.body).toMatchObject(completeDataWithoutDate);
  });
  test("it should catch missing propertise", () => {});

  test("it should catch invalid dates", () => {});
});
