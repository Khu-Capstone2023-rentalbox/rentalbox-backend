const userDao = {
    insertGroup : async(connection, insertParam) =>{
        const sql = `insert into club(name, members) values (?, ?);`
        try{
        await connection.beginTransaction()
        const [queryResult] = await connection.execute(sql, insertParam)
        
        console.log(queryResult)
        await connection.commit()
        
        return {
            error : false,
            insertId : queryResult.insertId
        }
        }catch(e){
            console.log(e)
            await connection.rollback()
            return {
                error : true,
                message : `error type : ${e.name}, error message : ${e.message}`
            }
        }
    },
    insertUserBulk : async(connection, list, organizationId, organizationLength) =>{
        let sql = `insert into user(id, name, club_id) values`
        for(let i = 0; i < organizationLength; i++){
            const dataArr = list[i].split(' ')
            const singleData = ` ('${dataArr[0]}', '${dataArr[1]}', ${organizationId})`
            sql += singleData
            if (i != organizationLength - 1)
                sql += ','
            console.log(singleData)
        }

        try{
            await connection.beginTransaction()
            const [queryResult] = await connection.execute(sql)

            console.log(queryResult)
            await connection.commit()

            return{
                error : false,
                insertedCount : organizationLength
            }
        }catch(e){
            console.log(e)
            await connection.rollback()
            return {
                error : true,
                message : `error type : ${e.name}, error message : ${e.message}`
            } 
        }
    },
    selectClubById : async(connection, clubId) =>{
        const sql = `select id from club where id = ${clubId}`
        try{
            await connection.beginTransaction()
            const [queryResult] = await connection.execute(sql)

            await connection.commit()

            return queryResult
        }catch(e){
            console.log(e)
            await connection.rollback()
            return {
                error : true,
                message : `error type : ${e.name}, error message : ${e.message}`
            } 
        }
    },
    selectUserById : async(connection, userId) =>{
        const sql = `select id, club_id from user where id = '${userId}'`
        try{
            await connection.beginTransaction()
            const [queryResult] = await connection.execute(sql)

            console.log("the user's data in dao", queryResult)
            await connection.commit()

            return queryResult
        }catch(e){
            console.log(e)
            await connection.rollback()
            return {
                error : true,
                message : `error type : ${e.name}, error message : ${e.message}`
            } 
        }
    }
}

export default userDao