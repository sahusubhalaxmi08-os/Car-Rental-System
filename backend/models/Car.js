import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    brand: {
      type: String,
      required: true,
      trim: true
    },

    model: {
      type: String,
      default: ""
    },

    year: {
      type: Number,
      default: new Date().getFullYear()
    },

    pricePerDay: {
      type: Number,
      required: true,
      min: 0
    },

    fuelType: {
      type: String,
      enum: [
        "Petrol",
        "Diesel",
        "Electric",
        "Hybrid"
      ],
      default: "Petrol"
    },

    transmission: {
      type: String,
      enum: [
        "Manual",
        "Automatic"
      ],
      default: "Manual"
    },

    seats: {
      type: Number,
      default: 5
    },

    image: {
      type: String,
      default: ""
    },

    description: {
      type: String,
      default: ""
    },

    available: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const Car = mongoose.model(
  "Car",
  carSchema
);

export default Car;