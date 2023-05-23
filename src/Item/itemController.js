import errResponseObj from "../../config/errResponseObj"
import middlewares from "../../config/middlewares"
import { errResponse, response } from "../../config/response"
import responseObj from "../../config/responseObj"
import itemProvider from "./itemProvider"
import itemService from "./itemService"

const itemController = {
    addItem : async(req,res) => {
        try{
            const itemName = req.body.itemName;
            const count = req.body.count;
            const clubId = req.verifiedToken.userClub;

            if (!itemName)
                return res.status(400).json(errResponse(errResponseObj.ITEMNAME_EXIT_ERROR))
            const addItemInfo  = await itemService.addItem(itemName, count, clubId);
            if (addItemInfo.error){
                let errResponseData = errResponseObj.DB_QUERY_ERROR
                errResponseData.message = addItemInfo.message
                return res.status(500).json(errResponse(errResponseData))
            }
            return res.json(response(responseObj));
        }catch(e){
            middlewares.serverErrorResolver(req,res,e)
        }
    },
    getItem : async(req,res) => {
        try{
            const itemId = req.params.itemId;
            console.log("fuck fuck fuck")
            if (!itemId)
                return res.status(400).json(errResponse(errResponseObj.ITEMID_EXIT_ERROR))

            const selectItemInfo  = await itemProvider.selectItem(itemId);
            return res.json(response(responseObj, selectItemInfo));
        }catch(e){
            middlewares.serverErrorResolver(req,res,e)
        }
    },
    getItemListByPicture : async(req,res) =>{
        console.log(req.file.location)
        res.json(req.file)
    },
    getMyItem : async(req,res) => {
        try{
            const itemId = req.params.itemId;
            const {userId} = req.verifiedToken
            console.log(userId)
            if (!itemId)
                return res.status(400).json(errResponse(errResponseObj.ITEMID_EXIT_ERROR))
            const selectItemInfo  = await itemProvider.selectMyItem(itemId, userId);
            return res.json(response(responseObj, selectItemInfo));
        }catch(e){
            console.log("error")
            middlewares.serverErrorResolver(req,res,e)
        }
    },
    getMyList : async(req, res) => {
        try {
            const {userId} = req.verifiedToken;
            
            if (!userId)
            return res.status(400).json(errResponse(errResponseObj.USERID_EXIT_ERROR))

            const selectMyListInfo  = await itemProvider.selectMyList(userId);
            return res.json(response(responseObj, selectMyListInfo));
        } catch(e){
            middlewares.serverErrorResolver(req,res,e)
        }
    }
}
 
export default itemController