import {pool} from "../../config/database"
import itemDao from "./itemDao"

const itemProvider = {
    selectItem : async(itemId) => {
        try {
            console.log("Select item by id:", itemId);
            
            const connection = await pool.getConnection(async (conn) => conn);
            const selectItemResult = await itemDao.selectByItemId(connection, itemId);

            connection.release();

            return selectItemResult
        } catch (err){
            return {
                error : true,
                message : `error type : ${err.name}, error message : ${err.message}`
            } 
        }
    },
}

export default itemProvider