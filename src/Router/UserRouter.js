import { Router } from "express";
import { userRegister,userLogin, userUpdate, deleteUser, getAllUser, getUserById } from "../Controller/UserController.js";
import { AuthMiddleware } from "../Middleware/AuthMiddleware.js";


const userRouter = Router();

//login
userRouter.post('/login'  ,userLogin )
//register
userRouter.post('/register', userRegister)
//update user
userRouter.put('/:id',AuthMiddleware, userUpdate)
//delete user
userRouter.delete('/:userId',AuthMiddleware, deleteUser)
//get all users
userRouter.get('/',AuthMiddleware, getAllUser)
//get user by id
userRouter.get('/:id',AuthMiddleware, getUserById)

export default userRouter;