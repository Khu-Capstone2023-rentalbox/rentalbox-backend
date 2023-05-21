import {pool} from "../../config/database"
import itemDao from "./itemDao"

const itemProvider = {
    selectItem : async(itemId) => {
        try {
            console.log("Select item by id:", itemId);
            
            const connection = await pool.getConnection(async (conn) => conn);
            const selectItemResult = await itemDao.selectByItemId(connection, itemId);
            
            const items = {};

            selectItemResult.forEach((row) => {
            if (!items[row.name]) {
                items[row.name] = {
                name: row.name,
                count: row.count,
                rentals: [],
                };
            }
            });

            selectItemResult.forEach((row) => {
            items[row.name].rentals.push({
                owner_name: row.owner_name,
                rental_time: row.rental_time,
            });
            });

            const result = Object.values(items);

            connection.release();

            return result[0]
        } catch (err){
            return {
                error : true,
                message : `error type : ${err.name}, error message : ${err.message}`
            } 
        }
    },

    selectMyItem : async(itemId) => {
        try {
            console.log("Select my item by id:", itemId);
            
            const connection = await pool.getConnection(async (conn) => conn);
            const selectMyItemResult = await itemDao.selectMyByItemId(connection, itemId);

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