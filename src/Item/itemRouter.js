import express from "express"
import itemController from "./itemController"
import middlewares from "../../config/middlewares"

const itemRouter = express.Router()

itemRouter.post('/',middlewares.jwtMiddleware,itemController.addItem)
itemRouter.get('/:itemId',middlewares.jwtMiddleware,itemController.getItem)
itemRouter.get('/myItem/:itemId',middlewares.jwtMiddleware,itemController.getMyItem)


export default itemRouter