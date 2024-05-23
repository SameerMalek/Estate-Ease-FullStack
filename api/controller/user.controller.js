import bcrypt from "bcrypt";
import prisma from "./../lib/prisma.js";
// import { savePost } from './user.controller';

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get users!" });
  }
};
export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
   return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get user!" });
  }
};
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const { password, avatar, ...inputs } = req.body;
  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized User!" });
  }

  let updatedPassword = null;
  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }
    const updateUser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && { avatar }),
      },
    });
    const { password: userPassword, ...rest } = updateUser;
    return res.status(200).json(rest);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update user!" });
  }
};
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  try {
    await prisma.user.delete({
      where: { id },
    });
    res.status(200).json({ message: "User Deleted Successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete user!" });
  }
};

export const savePost = async (req, res) => {
  const postId = req.body.postId;
  const tokenUserId = req.userId;
  try {
    const savedPost = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          userId: tokenUserId,
          postId,
        },
      },
    });

    if (savedPost) {
      await prisma.savedPost.delete({
        where: {
          id: savedPost.id,
        },
      });
      res.status(200).json({ message: "Post removed from Saved List!" });
    }

    else{
      await prisma.savedPost.create({
        data: {
         userId:tokenUserId,
         postId,
        },
      });
      res.status(200).json({ message: "Post Saved!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to Save Post!" });
  }
};

export const profilePosts = async (req, res) => {
  const tokenUserId = req.params.userId;

  try {
   const userPosts= await prisma.post.findMany({
      where: { userId: tokenUserId },
    });

    const saved= await prisma.savedPost.findMany({
      where: { userId: tokenUserId },
      include:{
        post:true
      },
    });
    const savedPosts = saved.map(item => item.post)
   return res.status(200).json({userPosts , savedPosts});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get profile posts!" });
  }
};

export const getNotificationNumber = async (req, res) => {
  const tokenUserId = req.userId;

  try {
const number = await prisma.chat.count({
  where:{
    userIDs:{
      hasSome:[tokenUserId],
    },
    NOT:{
      seenBy:{
        hasSome:[tokenUserId],
      },
    },
  },
});
res.status(200).json(number);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get notifications!" });
  }
};

