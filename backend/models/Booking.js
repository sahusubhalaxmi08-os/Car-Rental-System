import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true
    },

    pickupDate: {
      type: Date,
      required: true
    },

    returnDate: {
      type: Date,
      required: true
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },

    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "completed",
        "cancelled"
      ],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

const Booking = mongoose.model(
  "Booking",
  bookingSchema
);

export default Booking;