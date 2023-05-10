import {pool} from "../../config/database"
import itemDao from "./itemDao"

const itemProvider = {
    selectMyItem : async(itemId) => {
        try {
            console.log("Select my item by id:", itemId);
            
            const connection = await pool.getConnection(async (conn) => conn);
            const selectMyItemResult = await itemDao.selectByItemId(connection, itemId);

            connection.release();

            return selectMyItemResult
        } catch (err){
            return {
                error : true,
                message : `error type : ${err.name}, error message : ${err.message}`
            } 
        }
    },
}

export default itemProvider