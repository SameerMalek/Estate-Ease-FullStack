import express, { json } from "express"
import cors from "cors";
import postRoute from "./routes/post.route.js"
import userRoute from "./routes/user.route.js"
import testRoute from "./routes/test.route.js"
import authRoute from "./routes/auth.route.js"
import cookieParser from "cookie-parser";
import { verifyToken } from './middleware/verifyToken.js';

const app=express();
const PORT=8000;

app.use(json());
app.use(cookieParser());
app.use(cors({origin:process.env.CLIENT_URL, credentials:true}));


app.use("/api/post",postRoute);
app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/test",testRoute);

app.listen(PORT,()=>{
    console.log("Server has started at",PORT)
})