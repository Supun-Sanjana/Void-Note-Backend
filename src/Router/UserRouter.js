import { Router } from "express";
import { userRegister,userLogin, userUpdate, deleteUser, getAllUser, getUserById } from "../Controller/UserController.js";


const userRouter = Router();

//login
userRouter.post('/login',userLogin )
//register
userRouter.post('/register', userRegister)
//update user
userRouter.put('/:id', userUpdate)
//delete user
userRouter.delete('/:userId', deleteUser)
//get all users
userRouter.get('/', getAllUser)
//get user by id
userRouter.get('/:id', getUserById)

export default userRouter;