const searchDao = {
    selectByName : async (connection, keyword, last) =>{
        let sql = ""

        console.log(last)
        if(typeof last === "undefined")
            sql = `select id,name,count from items where name like '%${keyword}%' order by created_at desc limit 8;`
        else{
            console.log("hi")
            sql = `select id,name,count from items where name like '%${keyword}%' and created_at < (select created_at from items where id = ${last}) order by created_at desc limit 8;`
        }

        const [queryResult] = await connection.query(sql)
        //result.created_at = result.created_at.slice(0, result.created_at.length - 8)
        return queryResult
    }
}

export default searchDao