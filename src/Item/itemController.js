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
            const clubId = req.verifiedToken.club;
            
            if (!itemName)
                return res.status(400).json(errResponse(errResponseObj.ITEMNAME_EXIT_ERROR))

            const addItemInfo  = await itemService.addItem(itemName, count, clubId);
            return res.json(response(responseObj));
        }catch(e){
            middlewares.serverErrorResolver(req,res,e)
        }
    },
    getItem : async(req,res) => {
        try{
            const itemId = req.params.itemId;
            
            if (!itemId)
                return res.status(400).json(errResponse(errResponseObj.ITEMID_EXIT_ERROR))

            const selectItemInfo  = await itemProvider.selectItem(itemId);
            return res.json(response(responseObj, selectItemInfo));
        }catch(e){
            middlewares.serverErrorResolver(req,res,e)
        }
    },
    getMyItem : async(req,res) => {
        try{
            const itemId = req.params.itemId;
            
            if (!itemId)
                return res.status(400).json(errResponse(errResponseObj.ITEMID_EXIT_ERROR))

            const selectMyItemInfo  = await itemProvider.selectMyItem(itemId);
            return res.json(response(responseObj, selectMyItemInfo));
        }catch(e){
            middlewares.serverErrorResolver(req,res,e)
        }
    },
    getMyList : async(req, res) => {
        try {
            const userId = req.params.userId;
            const page = req.query.page;
            const pageSize = req.query.pageSize;
            
            if (!userId)
            return res.status(400).json(errResponse(errResponseObj.USERID_EXIT_ERROR))

            const selectMyListInfo  = await itemProvider.selectMyList(userId, page, pageSize);
            return res.json(response(responseObj, selectMyListInfo));
        } catch(e){
            middlewares.serverErrorResolver(req,res,e)
        }
    }
}
 
export default itemController