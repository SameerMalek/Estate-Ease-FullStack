import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const registerUsers = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //Hashing the password:
    const hashedPasssword = await bcrypt.hash(password, 10);

    //Create the new user and Save to Database:
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPasssword,
      },
    });
    res.status(201).json({ message: "User Created Successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create user!" });
  }
};

export const loginUsers = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if user exists or not?
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user) return res.status(401).json({ message: "Invalid Credentials!" });

    // Check if password is correct?
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid Credentials!" });

    // Generate cookie using jwt and send to user:
    const age = 1000 * 60 * 60 * 24 * 7;

    const token = jwt.sign(
      {
        id: user.id,
        isAdmin:true,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const {password:userPassword, ...userInfo}=user
    res
      .cookie("token", token, {
        httpOnly: true,
        // secure:true,
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to Login!" });
  }
};

export const logoutUsers = async (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successfull!" });
};
