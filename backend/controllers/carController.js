import Car from "../models/Car.js";


// GET ALL CARS

export const getCars = async (
  req,
  res
) => {

  try {

    const cars =
      await Car.find()
        .sort({
          createdAt: -1
        });

    res.json(cars);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};


// GET SINGLE CAR

export const getCarById = async (
  req,
  res
) => {

  try {

    const car =
      await Car.findById(
        req.params.id
      );

    if (!car) {
      return res.status(404).json({
        message: "Car not found."
      });
    }

    res.json(car);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};


// ADD CAR

export const addCar = async (
  req,
  res
) => {

  try {

    const car =
      await Car.create(req.body);

    res.status(201).json({
      message:
        "Car added successfully.",
      car
    });

  } catch (error) {

    res.status(400).json({
      message: error.message
    });
  }
};


// UPDATE CAR

export const updateCar = async (
  req,
  res
) => {

  try {

    const car =
      await Car.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true
        }
      );

    if (!car) {
      return res.status(404).json({
        message: "Car not found."
      });
    }

    res.json({
      message:
        "Car updated successfully.",
      car
    });

  } catch (error) {

    res.status(400).json({
      message: error.message
    });
  }
};


// DELETE CAR

export const deleteCar = async (
  req,
  res
) => {

  try {

    const car =
      await Car.findByIdAndDelete(
        req.params.id
      );

    if (!car) {
      return res.status(404).json({
        message: "Car not found."
      });
    }

    res.json({
      message:
        "Car deleted successfully."
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};