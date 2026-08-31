import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (id) => {

  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d"
    }
  );
};


// REGISTER

export const register = async (
  req,
  res
) => {

  try {

    const {
      name,
      email,
      phone,
      password
    } = req.body;

    if (
      !name ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        message:
          "Name, email and password are required."
      });
    }

    const existingUser =
      await User.findOne({
        email
      });

    if (existingUser) {
      return res.status(400).json({
        message:
          "User already exists."
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const user =
      await User.create({
        name,
        email,
        phone,
        password: hashedPassword,
        role: "user"
      });

    const token =
      generateToken(user._id);

    res.status(201).json({
      message:
        "Registration successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};


// LOGIN

export const login = async (
  req,
  res
) => {

  try {

    const {
      email,
      password
    } = req.body;

    const user =
      await User.findOne({
        email
      });

    if (!user) {
      return res.status(401).json({
        message:
          "Invalid email or password."
      });
    }

    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!passwordMatch) {
      return res.status(401).json({
        message:
          "Invalid email or password."
      });
    }

    const token =
      generateToken(user._id);

    res.json({
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};


// CREATE ADMIN

export const createAdmin = async () => {

  try {

    const email =
      process.env.ADMIN_EMAIL;

    const password =
      process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      console.log(
        "Admin credentials not found in .env"
      );

      return;
    }

    const existingAdmin =
      await User.findOne({
        email
      });

    if (existingAdmin) {

      if (
        existingAdmin.role !== "admin"
      ) {

        existingAdmin.role =
          "admin";

        await existingAdmin.save();
      }

      console.log(
        `Admin already exists: ${email}`
      );

      return;
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    await User.create({
      name: "System Admin",
      email,
      password: hashedPassword,
      role: "admin"
    });

    console.log(
      `Admin created: ${email}`
    );

  } catch (error) {

    console.error(
      "Admin creation error:",
      error.message
    );
  }
};