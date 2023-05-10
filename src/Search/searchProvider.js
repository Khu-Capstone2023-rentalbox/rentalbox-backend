import pool from "../../config/database"
import searchDao from "./searchDao"

const searchProvider = {
    searchByKeyword : async(keyword, last) =>{
        const connection = await pool.getConnection(conn => conn)
        const searchResult = await searchDao.selectByName(connection, keyword, last)
        connection.release()
        return searchResult
    },
}

export default searchProvider