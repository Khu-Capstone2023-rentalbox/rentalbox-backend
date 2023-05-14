import pool from "../../config/database"
import rootDao from "./rootDao"

const rootProvider = {
    getMainItemList : async(clubId, last) =>{
        const connection = await pool.getConnection(conn => conn)
        const result = await rootDao.getClubItemList(clubId, connection, last)
        return result
    }
}

export default rootProvider