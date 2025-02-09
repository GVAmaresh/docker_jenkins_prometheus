
import { createUser, getAllUsers } from "../../controllers/userControllers";
import User from "../../models/userModel";
import { Request, Response } from "express";

jest.mock("../../models/userModel");

describe("User Controller", () => {
  it("should create a new user", async () => {
    const mockUser = { name: "John Doe", email: "john@example.com" };
    (User.create as jest.Mock).mockResolvedValue(mockUser);

    const req = { body: mockUser } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  it("should fetch all users", async () => {
    const mockUsers = [{ name: "John" }, { name: "Jane" }];
    (User.find as jest.Mock).mockResolvedValue(mockUsers);

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    await getAllUsers(req, res);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockUsers);
  });
});
