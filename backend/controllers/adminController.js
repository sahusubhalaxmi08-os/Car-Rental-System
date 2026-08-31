import User from "../models/User.js";
import Car from "../models/Car.js";
import Booking from "../models/Booking.js";
import Payment from "../models/Payment.js";


// DASHBOARD

export const getDashboard =
  async (req, res) => {

    try {

      const users =
        await User.countDocuments();

      const cars =
        await Car.countDocuments();

      const bookings =
        await Booking.countDocuments();

      const payments =
        await Payment.countDocuments();

      const revenueResult =
        await Payment.aggregate([
          {
            $match: {
              status: "success"
            }
          },
          {
            $group: {
              _id: null,
              total: {
                $sum: "$amount"
              }
            }
          }
        ]);

      const revenue =
        revenueResult.length > 0
          ? revenueResult[0].total
          : 0;

      res.json({
        users,
        cars,
        bookings,
        payments,
        revenue
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });
    }
  };


// GET ALL USERS

export const getUsers =
  async (req, res) => {

    try {

      const users =
        await User.find()
          .select("-password")
          .sort({
            createdAt: -1
          });

      res.json(users);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });
    }
  };


// GET ALL BOOKINGS

export const getBookings =
  async (req, res) => {

    try {

      const bookings =
        await Booking.find()
          .populate(
            "user",
            "name email phone"
          )
          .populate("car")
          .sort({
            createdAt: -1
          });

      res.json(bookings);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });
    }
  };


// UPDATE BOOKING STATUS

export const updateBookingStatus =
  async (req, res) => {

    try {

      const {
        status
      } = req.body;

      const allowedStatuses = [
        "pending",
        "confirmed",
        "completed",
        "cancelled"
      ];

      if (
        !allowedStatuses.includes(
          status
        )
      ) {
        return res.status(400).json({
          message:
            "Invalid booking status."
        });
      }

      const booking =
        await Booking.findById(
          req.params.id
        );

      if (!booking) {
        return res.status(404).json({
          message:
            "Booking not found."
        });
      }

      booking.status = status;

      await booking.save();

      res.json({
        message:
          "Booking status updated.",
        booking
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });
    }
  };


// GET ALL PAYMENTS

export const getPayments =
  async (req, res) => {

    try {

      const payments =
        await Payment.find()
          .populate(
            "user",
            "name email"
          )
          .populate("booking")
          .sort({
            createdAt: -1
          });

      res.json(payments);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });
    }
  };