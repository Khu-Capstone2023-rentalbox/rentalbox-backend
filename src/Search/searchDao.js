const searchDao = {
    selectByName : async (connection, keyword) =>{
        const sql = `select id,name,count from items where name like '%${keyword}%';`

        const [queryResult] = await connection.query(sql)
        //result.created_at = result.created_at.slice(0, result.created_at.length - 8)
        return queryResult
    }
}

export default searchDao