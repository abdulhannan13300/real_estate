import express from "express";
import {
  createResidency,
  getAllResidencies,
  getResidency,
} from "../controllers/rsdncControllers.js";
const router = express.Router();

router.post("/create", createResidency);
router.get("/allresd", getAllResidencies);
router.get("/:id", getResidency);

export { router as residencyRoute };
