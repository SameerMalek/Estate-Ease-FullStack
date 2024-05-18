import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controller/user.controller.js";
import { verifyToken } from './../middleware/verifyToken.js';

const router = express.Router();

router
.route("/")
.get(getUsers)

router
.route("/:id")
.get(verifyToken,getUser)

router
.route("/:id")
.put(verifyToken,updateUser)

router
.route("/:id")
.delete(verifyToken,deleteUser)

export default router;