import express from "express";

import {
  getDashboard,
  getUsers,
  getBookings,
  updateBookingStatus,
  getPayments
} from "../controllers/adminController.js";

import {
  protect
} from "../middleware/authMiddleware.js";

import {
  adminOnly
} from "../middleware/adminMiddleware.js";

const router =
  express.Router();

router.use(
  protect,
  adminOnly
);

router.get(
  "/dashboard",
  getDashboard
);

router.get(
  "/users",
  getUsers
);

router.get(
  "/bookings",
  getBookings
);

router.put(
  "/bookings/:id",
  updateBookingStatus
);

router.get(
  "/payments",
  getPayments
);

export default router;