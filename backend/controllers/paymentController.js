import Payment from "../models/Payment.js";
import Booking from "../models/Booking.js";


// CREATE PAYMENT

export const createPayment = async (
  req,
  res
) => {

  try {

    const {
      bookingId,
      amount,
      paymentMethod
    } = req.body;

    const booking =
      await Booking.findById(
        bookingId
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

    const existingPayment =
      await Payment.findOne({
        booking: bookingId,
        status: "success"
      });

    if (existingPayment) {
      return res.status(400).json({
        message:
          "Payment already completed."
      });
    }

    const payment =
      await Payment.create({
        booking: bookingId,
        user: req.user._id,
        amount:
          amount || booking.totalAmount,
        paymentMethod:
          paymentMethod || "Demo Card",
        status: "success",
        transactionId:
          `TXN-${Date.now()}`
      });

    booking.status =
      "confirmed";

    await booking.save();

    res.status(201).json({
      message:
        "Payment successful.",
      payment
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};


// GET MY PAYMENTS

export const getMyPayments = async (
  req,
  res
) => {

  try {

    const payments =
      await Payment.find({
        user: req.user._id
      })
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