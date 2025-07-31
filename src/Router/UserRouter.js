import { Router } from "express";
import { userRegister,userLogin } from "../Controller/UserController.js";


const userRouter = Router();

//login
userRouter.post('/login',userLogin )
//register

userRouter.post('/register', userRegister)

//get all users
//get user by id


export default userRouter;