import express from "express"
import rootController from "./rootController"
import middlewares from "../../config/middlewares"


const rootRouter = express.Router()

rootRouter.get('/',rootController.getMainPage)


export default rootRouter