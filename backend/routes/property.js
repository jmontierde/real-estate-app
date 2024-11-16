import express from "express";
import {
  deleteProperty,
  getProperties,
  getProperty,
  newProperty,
  updateProperty,
} from "../controllers/property.controller.js";
const router = express.Router();

router.post("/", newProperty);
router.get("/", getProperties);
router.get("/:id", getProperty);
router.put("/:id", updateProperty);
router.delete("/:id", deleteProperty);

export default router;
