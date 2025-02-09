import request from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "../../app";
dotenv.config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI || "");
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("E2E User API", () => {
  it("should create and retrieve a user", async () => {
    const userData = { name: "Alice", email: "alice@example.com" };

    const createRes = await request(app).post("/api/users").send(userData);
    expect(createRes.statusCode).toBe(201);
    expect(createRes.body.name).toBe(userData.name);

    const getRes = await request(app).get("/api/users");
    expect(getRes.statusCode).toBe(200);
    expect(getRes.body.some((u: any) => u.name === userData.name)).toBeTruthy();
  });
});
