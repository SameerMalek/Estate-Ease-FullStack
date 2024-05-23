import express from "express";
import { verifyToken } from './../middleware/verifyToken.js';
import { addPost, deletePost, getPost, getPosts, updatePost } from "../controller/post.controller.js";

const router=express.Router();

router
.route("/")
.get(getPosts)

router
.route("/:id")
.get(getPost)

router
.route("/")
.post(verifyToken,addPost)

router
.route("/:id")
.put(verifyToken,updatePost)

router
.route("/:id")
.delete(verifyToken,deletePost)

export default router;