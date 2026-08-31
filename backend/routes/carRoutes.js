import express from "express";

import {
  getCars,
  getCarById,
  addCar,
  updateCar,
  deleteCar
} from "../controllers/carController.js";

import {
  protect
} from "../middleware/authMiddleware.js";

import {
  adminOnly
} from "../middleware/adminMiddleware.js";

const router =
  express.Router();

router.get(
  "/",
  getCars
);

router.get(
  "/:id",
  getCarById
);

router.post(
  "/",
  protect,
  adminOnly,
  addCar
);

router.put(
  "/:id",
  protect,
  adminOnly,
  updateCar
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteCar
);

export default router;