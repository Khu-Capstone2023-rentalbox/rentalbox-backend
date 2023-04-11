import express from "express"
import searchController from "./serachController"

const searchRouter = express.Router()

searchRouter.get('/',searchController.getSearch)


export default searchRouter