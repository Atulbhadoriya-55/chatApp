import bcrypt from "bcryptjs";
import User from "../model/usermodel.js";
import genToken from "../lib/token.js";
import cloudinary from "../lib/cloudinary.js";
import { io } from "../lib/socket.js"

export const signup = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    if (await User.findOne({ userName })) {
      return res.status(400).json({ message: "Username already exists" });
    }

    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password too short" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ userName, email, password: hashedPassword });
      if(newUser) {
        genToken( newUser._id , res )
        await newUser.save()
        res.status(201).json({
          _id: newUser._id,
          userName: newUser.userName,
          email: newUser.email,
          profileImage: newUser.profileImage,
        })
      } else {
        res.status(400).json({message: "Invalid user data"})
      }
  }
  catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
   const { email, password } = req.body;
  try {
        const user = await User.findOne({ email })
          if (!user) {
            return res.status(400).json({ message: "Invalid Email" });
          }
        const checkPassword = await bcrypt.compare(password, user.password)
          if (!checkPassword) {
            return res.status(400).json({ message: "Wrong Password" });
          }

        genToken(user._id ,res)
        res.status(200).json({
          _id: user._id,
          userName: user.userName,
          email: user.email,
          profileImage: user.profileImage,
        })
  } catch (error) {
    console.log("Error in login controller", error.message); 
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {maxAge:0})
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error in logout controller", error.message);
  }
};

export const updateProfile = async (req , res ) => {
  try {
    const { profileImage } = req.body;
    const userId = req.user._id;
    if (!profileImage) {
      return res.status(400).json({ message : "Profile image is required"});
    }
    
    const uploadResponse = await cloudinary.uploader.upload(profileImage);
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { profileImage: uploadResponse.secure_url },
      { new: true}
    );

    res.status(200).json(updateUser)

  }
  catch (error) {
    console.log("error in update profile" , error);
    res.status(500).json({ message: "internal server error" });
  }

};

export const checkAuth = async (req , res) => {
  try {
    res.status(200).json(req.user);
  }
  catch (error) {
    console.log("error in checkAuth controller", error.message);
    res.status(500).json({message: "Internal server error"})    
  }
};