import express from "express"
import itemController from "./itemController"
import middlewares from "../../config/middlewares"

const itemRouter = express.Router()

itemRouter.post('/',middlewares.jwtMiddleware,itemController.addItem)
itemRouter.get('/:itemId',itemController.getItem)
itemRouter.get('/myItem/:itemId',middlewares.jwtMiddleware,itemController.getMyItem)
itemRouter.get('/myItemList/:userId',middlewares.jwtMiddleware, itemController.getMyList)

export default itemRouter