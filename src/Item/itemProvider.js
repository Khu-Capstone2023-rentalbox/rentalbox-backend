import pool from "../../config/database"
import userDao from "../User/userDao";
import itemDao from "./itemDao"

const itemProvider = {
    selectItem : async(itemId) => {
        try {
            console.log("Select item by id:", itemId);
            
            const connection = await pool.getConnection(async (conn) => conn);
            const [selectItemResult] = await itemDao.selectByItemId(connection, itemId);
            
            console.log(selectItemResult)
            
            const rentalListResult = await itemDao.selectRentalById(connection, itemId)

            console.log(rentalListResult)

            selectItemResult.rentals = rentalListResult

            console.log(selectItemResult)

            return selectItemResult
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
    },
    selectBookId : async(title) =>{
        try {
            console.log("select book id by title in provider", title);

            const connection = await pool.getConnection(async (conn) => conn);

            const bookInfo = await itemDao.selectBookIdByName(connection, title)

            connection.release();

            return bookInfo
        } catch (err){
            return {
                error : true,
                message : `error type : ${err.name}, error message : ${err.message}`
            } 
        }
    }
}

export default itemProvider