import express from "express";

const router=express.Router();

router
.route("/")
.get((req,res)=>{
   res.send("Post Router is Working Now!");
})

export default router;