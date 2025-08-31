import express from "express";
import { protectRoute } from "../middleware/authmiddleware.js";
import { getUsersForSidebar , getMessages , sendMessage , deleteMessage } from "../controller/messagecontroller.js";

const messageRouter = express.Router();

    messageRouter.get("/users" , protectRoute , getUsersForSidebar)
    messageRouter.get("/:id" , protectRoute , getMessages)
    messageRouter.post("/send/:id" , protectRoute , sendMessage)
    messageRouter.delete("/:id", protectRoute, deleteMessage)

export default messageRouter;