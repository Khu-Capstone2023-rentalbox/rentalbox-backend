import pool from "../../config/database"
import userDao from "./userDao"

const userProvider = {
    getClubById : async (clubId) => {
        const connection = await pool.getConnection(async (conn) => conn)
        const findResult = await userDao.selectClubById(connection, clubId)
        connection.release()
        return findResult
    },
    getUserById : async (userId) =>{
        const connection = await pool.getConnection(async(conn) => conn)
        const findResult = await userDao.selectUserById(connection, userId)
        connection.release()
        return findResult
    }
}

export default userProvider