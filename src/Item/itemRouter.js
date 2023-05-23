import express from "express"
import itemController from "./itemController"
import middlewares from "../../config/middlewares"

const itemRouter = express.Router()


itemRouter.post('/',middlewares.jwtMiddleware,itemController.addItem)
itemRouter.get('/:itemId(\\d+)',middlewares.jwtMiddleware,itemController.getItem)
itemRouter.get('/my-item/:itemId(\\d+)',middlewares.jwtMiddleware,itemController.getMyItem)
itemRouter.get('/my-item-list',middlewares.jwtMiddleware, itemController.getMyList)
itemRouter.post('/picture',middlewares.jwtMiddleware,middlewares.s3Upload.single('picture'), itemController.getItemListByPicture)


export default itemRouter