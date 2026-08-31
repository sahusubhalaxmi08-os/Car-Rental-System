import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    amount: {
      type: Number,
      required: true
    },

    paymentMethod: {
      type: String,
      default: "Demo Card"
    },

    status: {
      type: String,
      enum: [
        "pending",
        "success",
        "failed"
      ],
      default: "success"
    },

    transactionId: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

const Payment = mongoose.model(
  "Payment",
  paymentSchema
);

export default Payment;