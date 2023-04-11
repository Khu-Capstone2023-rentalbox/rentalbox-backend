import pool from "../../config/database"
import searchDao from "./searchDao"

const searchProvider = {
    searchByKeyword : async(keyword) =>{
        const connection = await pool.getConnection(conn => conn)
        const searchResult = await searchDao.selectByName(connection, keyword)
        connection.release()
        return searchResult
    },
}

export default searchProvider