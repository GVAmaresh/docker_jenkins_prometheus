import request from "supertest";
import app from "../../app"; 
import User from "../../models/userModel";

jest.mock("../../models/userModel");

describe("User Routes", () => {
  it("should create a user via API", async () => {
    (User.create as jest.Mock).mockResolvedValue({ name: "John", email: "john@example.com" });

    const res = await request(app)
      .post("/api/users")
      .send({ name: "John", email: "john@example.com" });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("John");
  });

  it("should fetch all users via API", async () => {
    (User.find as jest.Mock).mockResolvedValue([{ name: "John" }, { name: "Jane" }]);

    const res = await request(app).get("/api/users");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
  });
});
