import express from "express";
import {addMessage} from "../controller/message.controller.js";
import { verifyToken } from './../middleware/verifyToken.js';


const router = express.Router();

router
.route("/:chatId")
.post(verifyToken,addMessage)

export default router;