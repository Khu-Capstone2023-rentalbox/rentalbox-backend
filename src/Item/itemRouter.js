import express from "express"
import itemController from "./itemController"
import middlewares from "../../config/middlewares"

const itemRouter = express.Router()

itemRouter.get('/',middlewares.jwtMiddleware,itemController.getItemList)
itemRouter.get('/picture',middlewares.jwtMiddleware,middlewares.uploadPicture, itemController.getItemListByPicture)


export default itemRouter