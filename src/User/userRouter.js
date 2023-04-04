import express from "express"
import middlewares from "../../config/middlewares"

const userRouter = express.Router()

userRouter.post('/sign-up', userController.startWithJoincode)
userRouter.post('/organization',userController.joinNewOrganization)
userRouter.get('/',middlewares.jwtMiddleware,userController.getMyPageData)

export default userRouter