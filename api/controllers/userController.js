import Post from "../models/Post.js";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password -resetPasswordToken -resetPasswordExpires -emailVerificationToken -emailVerificationExpires");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error. Please try again." });

  }
};



//Bereket you'll update the delete route
export const deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });

      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
      } catch (err) {
        res
          .status(500)
          .json({ message: "Internal server error. Please try again." });
      }
    } catch (err) {
      res.status(404).json("User not found!");
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
};


export const updateUser = async (req, res) => {
  const { userId } = req.body;
  const { id } = req.params;

  if (userId !== id) return res.status(403).json({ message: "Unauthorized to update this account" });

  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Failed to update user", error: err.message });

  }
};


