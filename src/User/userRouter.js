import express from "express"
import middlewares from "../../config/middlewares"
import userController from "./userController"

const userRouter = express.Router()

userRouter.post('/sign-up', userController.startWithJoincode)
userRouter.post('/organization',middlewares.uploadExel.single("excel") ,userController.signUpOrganization)
userRouter.get('/',middlewares.jwtMiddleware,userController.getMyPageData)

export default userRouter