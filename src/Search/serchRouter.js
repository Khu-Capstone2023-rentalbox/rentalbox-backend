import express from "express"
import searchController from "./serachController"
import middlewares from "../../config/middlewares"

const searchRouter = express.Router()

searchRouter.get('/',middlewares.jwtMiddleware,searchController.getSearch)


export default searchRouter