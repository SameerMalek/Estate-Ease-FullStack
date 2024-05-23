import express from "express";
import {getChats,getChat,addChat,readChat} from "../controller/chat.controller.js";
import { verifyToken } from './../middleware/verifyToken.js';


const router = express.Router();

router
.route("/")
.get(verifyToken,getChats)

router
.route("/:id")
.get(verifyToken,getChat)

router
.route("/")
.post(verifyToken,addChat)

router
.route("/read/:id")
.put(verifyToken,readChat)

export default router;