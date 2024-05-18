import express from "express";
import {loginUsers,registerUsers,logoutUsers} from "../controller/auth.controller.js";

const router = express.Router();

router
.route("/register")
.post(registerUsers)

router
.route("/login")
.post(loginUsers)

router
.route("/logout")
.post(logoutUsers)

export default router;