import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDb from "./lib/db.js";
import authRouter from "./route/authroute.js";
import messageRouter from "./route/messageroute.js";
import { app , server } from "./lib/socket.js"

dotenv.config();

const _dirname = path.resolve()
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json({ limit: "10mb" })); // increase JSON body limit
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true,
}));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname, "../frontend/dist")))

  app.get("/*" , (req,res) => {
    res.sendFile(path.join(_dirname, "../frontend", "dist", "index.html"))
  })
};

// Start server
server.listen(port, async () => {
  await connectDb();
  console.log(`✅ Server is running on port: ${port}`);
});
