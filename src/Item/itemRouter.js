import express from "express"
import itemController from "./itemController"
import middlewares from "../../config/middlewares"

const itemRouter = express.Router()

itemRouter.post('/',itemController.addItem)
//itemRouter.get('/picture',middlewares.jwtMiddleware,middlewares.uploadPicture, itemController.getItemListByPicture)


export default itemRouter