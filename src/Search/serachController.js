import errResponseObj from "../../config/errResponseObj"
import middlewares from "../../config/middlewares"
import { errResponse, response } from "../../config/response"
import responseObj from "../../config/responseObj"
import searchProvider from "./searchProvider"

const searchController = {
    getSearch : async(req,res) =>{
        try{
        const {keyword, last} = req.query
        console.log(keyword)
        if (typeof keyword === "undefined")
            return res.status(400).json(errResponse(errResponseObj.KEYWORD_EXIT_ERROR))
        
        const result  = await searchProvider.searchByKeyword(keyword, last)
        return res.json(response(responseObj,result))

        }catch(e){
            middlewares.serverErrorResolver(req,res,e)
        }
    }
}

export default searchController