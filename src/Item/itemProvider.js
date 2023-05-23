import pool from "../../config/database"
import userDao from "../User/userDao";
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
            console.log(row)
            items[row.name].rentals.push({
                owner_name: row.owner_name,
                rental_time: row.rental_time,
            });
            });

            const result = Object.values(items);

            connection.release();
            console.log(result)

            return result[0]
        } catch (err){
            return {
                error : true,
                message : `error type : ${err.name}, error message : ${err.message}`
            } 
        }
    },

    selectMyItem : async(itemId, userId) => {
        try {
            console.log("Select my item by id:", itemId);
            
            const connection = await pool.getConnection(async (conn) => conn);
            const selectMyItemResult = await itemDao.selectMyByItemId(connection, itemId, userId);

            connection.release();

            return selectMyItemResult
        } catch (err){
            return {
                error : true,
                message : `error type : ${err.name}, error message : ${err.message}`
            } 
        }
    },
    selectMyList : async(userId) => {
        try {
            console.log("Select my list by id:", userId);

            const connection = await pool.getConnection(async (conn) => conn);
            const responseResult = {userName : null, list : null}

            responseResult.userName = await userDao.selectUserName(connection,userId);

            responseResult.list = await itemDao.selectMyListByUserId(connection, userId);

            connection.release();

            console.log(responseResult)
            return responseResult
        } catch (err){
            return {
                error : true,
                message : `error type : ${err.name}, error message : ${err.message}`
            } 
        }
    }
}

export default itemProvider