import User from "../models/User.js";


// GET PROFILE

export const getProfile = async (
  req,
  res
) => {

  try {

    const user =
      await User.findById(
        req.user._id
      ).select("-password");

    res.json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};


// UPDATE PROFILE

export const updateProfile = async (
  req,
  res
) => {

  try {

    const {
      name,
      phone
    } = req.body;

    const user =
      await User.findById(
        req.user._id
      );

    if (!user) {
      return res.status(404).json({
        message:
          "User not found."
      });
    }

    if (name !== undefined) {
      user.name = name;
    }

    if (phone !== undefined) {
      user.phone = phone;
    }

    await user.save();

    res.json({
      message:
        "Profile updated successfully.",
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