import {pool} from "../../config/database"
import itemDao from "./itemDao"

const userService = {
    addItem : async(itemName, count) => {
        try {
            console.log("Add item", itemName, count);
            
            const connection = await pool.getConnection(async (conn) => conn);
            const addItemResult = await itemDao.insertItem(connection, itemName, count);
            connection.release();
        } catch (err){
            return {
                error : true,
                message : `error type : ${err.name}, error message : ${err.message}`
            } 
        }
    },    
}

export default userService