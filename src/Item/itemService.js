import fetch from "node-fetch";
import pool from "../../config/database";
import itemDao from "./itemDao"
import itemProvider from "./itemProvider";

const userService = {
    addItem : async(itemName, count, clubId) => {
        try {
            console.log("Add item", itemName, count);
            
            const connection = await pool.getConnection(async conn => conn);
            const addItemResult = await itemDao.insertItem(connection, itemName, count, clubId);
            console.log(addItemResult)
            if (addItemResult.error){
                connection.release()
                return addItemResult
            }
            else
                return addItemResult
        } catch (err){
            return {
                error : true,
                message : `error type : ${err.name}, error message : ${err.message}`
            } 
        }
    },
    rentItem : async(bookUrl, userId) =>{
        const AIApi = 'http://221.163.248.33:8000/inference_url'
        const AIServerResult = await fetch(AIApi,{
            method : "POST",
            headers : {
                "Content-type" : "application/json"
            },
            body :
                JSON.stringify({image : bookUrl})
        })

        const AIServerJson = await AIServerResult.json()
        console.log(AIServerJson.title)

        const bookInfo = await itemProvider.selectBookId(AIServerJson.title)

        if(bookInfo[0].count == 0)
            return {
                error : true,
                count : 0
            }
        try {
            const connection = await pool.getConnection(async conn => conn);
            const rentalResult = await itemDao.insertRental(connection, bookInfo[0].id, userId);
            if (rentalResult.error){
                connection.release()
                return rentalResult
            }
            else{
                const countResult = await itemDao.calcCountItem(connection,bookInfo[0].id)
                if (countResult.error){
                    connection.release()
                    return countResult
                }
                else
                    return countResult
            }
        }
        catch (err){
            return {
                error : true,
                message : `error type : ${err.name}, error message : ${err.message}`
            } 
        }
    }
}

export default userService