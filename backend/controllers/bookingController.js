import Booking from "../models/Booking.js";
import Car from "../models/Car.js";


// CREATE BOOKING

export const createBooking = async (
  req,
  res
) => {

  try {

    const {
      carId,
      pickupDate,
      returnDate
    } = req.body;

    if (
      !carId ||
      !pickupDate ||
      !returnDate
    ) {
      return res.status(400).json({
        message:
          "Car, pickup date and return date are required."
      });
    }

    const pickup =
      new Date(pickupDate);

    const returnD =
      new Date(returnDate);

    if (
      isNaN(pickup) ||
      isNaN(returnD)
    ) {
      return res.status(400).json({
        message: "Invalid dates."
      });
    }

    if (returnD <= pickup) {
      return res.status(400).json({
        message:
          "Return date must be after pickup date."
      });
    }

    const car =
      await Car.findById(carId);

    if (!car) {
      return res.status(404).json({
        message: "Car not found."
      });
    }

    if (!car.available) {
      return res.status(400).json({
        message:
          "Car is currently unavailable."
      });
    }

    // Check overlapping bookings

    const existingBooking =
      await Booking.findOne({
        car: carId,

        status: {
          $in: [
            "pending",
            "confirmed"
          ]
        },

        pickupDate: {
          $lt: returnD
        },

        returnDate: {
          $gt: pickup
        }
      });

    if (existingBooking) {
      return res.status(400).json({
        message:
          "Car is already booked for these dates."
      });
    }

    const millisecondsPerDay =
      1000 * 60 * 60 * 24;

    const days = Math.ceil(
      (returnD - pickup) /
      millisecondsPerDay
    );

    const totalAmount =
      days * car.pricePerDay;

    const booking =
      await Booking.create({
        user: req.user._id,
        car: carId,
        pickupDate: pickup,
        returnDate: returnD,
        totalAmount,
        status: "pending"
      });

    const populatedBooking =
      await Booking.findById(
        booking._id
      ).populate("car");

    res.status(201).json({
      message:
        "Booking created successfully.",
      booking:
        populatedBooking
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};


// GET MY BOOKINGS

export const getMyBookings = async (
  req,
  res
) => {

  try {

    const bookings =
      await Booking.find({
        user: req.user._id
      })
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


// GET BOOKING BY ID

export const getBookingById = async (
  req,
  res
) => {

  try {

    const booking =
      await Booking.findById(
        req.params.id
      )
        .populate("car")
        .populate(
          "user",
          "name email phone"
        );

    if (!booking) {
      return res.status(404).json({
        message:
          "Booking not found."
      });
    }

    // Only owner or admin

    if (
      booking.user._id.toString() !==
        req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Access denied."
      });
    }

    res.json(booking);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};


// CANCEL BOOKING

export const cancelBooking = async (
  req,
  res
) => {

  try {

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

    if (
      booking.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Access denied."
      });
    }

    if (
      booking.status ===
      "completed"
    ) {
      return res.status(400).json({
        message:
          "Completed booking cannot be cancelled."
      });
    }

    if (
      booking.status ===
      "cancelled"
    ) {
      return res.status(400).json({
        message:
          "Booking is already cancelled."
      });
    }

    booking.status =
      "cancelled";

    await booking.save();

    res.json({
      message:
        "Booking cancelled successfully.",
      booking
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};