import express from "express";
import { deleteUser, getUser, getUsers, updateUser , savePost, profilePosts, getNotificationNumber} from "../controller/user.controller.js";
import { verifyToken } from './../middleware/verifyToken.js';


const router = express.Router();

router
.route("/")
.get(getUsers)

// router
// .route("/:id")
// .get(verifyToken,getUser)

router
.route("/:id")
.put(verifyToken,updateUser)

router
.route("/:id")
.delete(verifyToken,deleteUser)

router
.route("/save")
.post(verifyToken,savePost)

router
.route("/profilePosts")
.get(verifyToken,profilePosts)

router
.route("/notification")
.get(verifyToken,getNotificationNumber)

export default router;