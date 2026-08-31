import "dotenv/config";

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

import {
  createAdmin
} from "./controllers/authController.js";

import authRoutes from "./routes/authRoutes.js";
import carRoutes from "./routes/carRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

import {
  errorMiddleware
} from "./middleware/errorMiddleware.js";

const app =
  express();


// ================================
// MIDDLEWARE
// ================================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

app.use(
  express.json()
);

app.use(
  express.urlencoded({
    extended: true
  })
);


// ================================
// DEFAULT ROUTE
// ================================

app.get(
  "/",
  (req, res) => {

    res.json({
      message:
        "Car Rental API is running..."
    });

  }
);


// ================================
// API ROUTES
// ================================

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/cars",
  carRoutes
);

app.use(
  "/api/bookings",
  bookingRoutes
);

app.use(
  "/api/payments",
  paymentRoutes
);

app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);


// ================================
// ERROR HANDLER
// ================================

app.use(
  errorMiddleware
);


// ================================
// START SERVER
// ================================

const PORT =
  process.env.PORT || 5000;

const startServer =
  async () => {

    try {

      await connectDB();

      await createAdmin();

      app.listen(
        PORT,
        () => {

          console.log(
            `Server running on http://localhost:${PORT}`
          );

          console.log(
            `Admin login: ${process.env.ADMIN_EMAIL}`
          );

        }
      );

    } catch (error) {

      console.error(
        "Server startup failed:",
        error.message
      );

      process.exit(1);
    }
  };

startServer();