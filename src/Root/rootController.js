
import middlewares from "../../config/middlewares"
import rootProvider from "./rootProvider"
import responseObj from "../../config/responseObj"
import { response } from "../../config/response"

const rootController = {
    getMainPage : async(req, res) =>{
        try{
        const userClub = 2
        const {last} = req.query
        const result = await rootProvider.getMainItemList(userClub, last)

        return res.status(200).json(response(responseObj, result))
        }catch(e){
            middlewares.serverErrorResolver(req, res, e)
        }
    }
}

export default rootController