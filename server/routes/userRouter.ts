import { createUser, getAllUsers } from "../controllers/userControllers";

const express = require("express");

const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);

export default router;