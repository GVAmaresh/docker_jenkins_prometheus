import { Request, Response } from "express";
import userModel from "../models/userModel";


export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email } = req.body;
    const user = await userModel.create({ name, email });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};
