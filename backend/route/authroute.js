import express from "express";
import { login, logout, signup , updateProfile , checkAuth ,/* changeUsername, changePassword */} from "../controller/usercontroller.js";
import { protectRoute } from "../middleware/authmiddleware.js";

const authRouter = express.Router()
    authRouter.post("/signup" , signup)
    authRouter.post("/login" , login)
    authRouter.post("/logout" , logout)

    authRouter.put("/update-profile" , protectRoute , updateProfile)

    authRouter.get("/check" , protectRoute , checkAuth)

    //authRouter.put("/update-username", protectRoute, changeUsername)
    //authRouter.put("/update-password", protectRoute, changePassword)

export default authRouter;