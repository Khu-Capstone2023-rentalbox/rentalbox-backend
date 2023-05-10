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
            
            if (!itemName)
                return res.status(400).json(errResponse(errResponseObj.KEYWORD_EXIT_ERROR))

            const addItemInfo  = await itemService.addItem(itemName, count)
            return res.send(addItemInfo);
        }catch(e){
            middlewares.serverErrorResolver(req,res,e)
        }
    },
    getItemListByPicture : async(req,res) =>{
        console.log(req.file.location)
        res.json(req.file)
    }
    getItem : async(req,res) => {
        try{
            const itemId = req.params.itemId;
            
            if (!itemId)
                return res.status(400).json(errResponse(errResponseObj.KEYWORD_EXIT_ERROR))

            const selectItemInfo  = await itemProvider.selectItem(itemId);
            return res.send(selectItemInfo);
        }catch(e){
            middlewares.serverErrorResolver(req,res,e)
        }
    },
}
 
export default itemController