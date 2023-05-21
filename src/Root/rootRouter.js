import express from "express"
import rootController from "./rootController"
import middlewares from "../../config/middlewares"


const rootRouter = express.Router()

rootRouter.get('/',middlewares.jwtMiddleware,rootController.getMainPage)


export default rootRouter