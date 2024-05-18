import express from "express";
import { shouldBeAdmin, shouldBeLoggedIn } from './../controller/test.controller.js';
import { verifyToken } from "../middleware/verifyToken.js";

const router=express.Router();

router
.route("/should-be-logged-in")
.get(verifyToken,shouldBeLoggedIn)

router
.route("/should-be-admin")
.get(verifyToken,shouldBeAdmin)

export default router;