import request from "supertest"
import app from "../apps.js"

describe("Test Get Launchs", () =>{
    test("it should respond with 200", async () =>{    
     const response = await request(app).get("/launch");
     expect(response.statusCode).toBe(200)
    }
    )
})

describe("Test Post Launchs", () => {
  test("it should respond with 200", () => {

  });
  test("it should catch missing propertise", () => {
     
  });

  test("it should catch invalid dates", () => {

  });
});