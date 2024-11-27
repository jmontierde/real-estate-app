import express from "express";
import {
  deleteProperty,
  getProperties,
  getProperty,
  newProperty,
  updateProperty,
} from "../controllers/property.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.post("/", verifyToken, newProperty);
router.get("/", verifyToken, getProperties);
router.get("/:id", verifyToken, getProperty);
router.put("/:id", verifyToken, updateProperty);
router.delete("/:id", verifyToken, deleteProperty);

export default router;
