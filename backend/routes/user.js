import express from "express";

import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  updatePassword,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.get("/", getUsers);
router.get("/:id", verifyToken, getUser);
router.put("/:id", verifyToken, updateUser);
router.put("/password/:id", verifyToken, updatePassword);

router.delete("/:id", verifyToken, deleteUser);

export default router;
