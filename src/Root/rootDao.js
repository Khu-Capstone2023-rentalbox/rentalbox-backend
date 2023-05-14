const rootDao = {
    getClubItemList : async(clubId, connection, last) =>{
        let sql = ''
        if (typeof last != 'undefined')
             sql = `select i.id as bookId, i.name from items as i join club c on c.id = i.club_id where i.club_id = ${clubId} and i.created_at < (select i.created_at from items as i where i.id = ${last}) order by i.created_at desc limit 8;`
        else
            sql = `select i.id as bookId, i.name from items as i join club c on c.id = i.club_id where i.club_id = ${clubId} order by i.created_at desc limit 8;`
        try{
            const [result] = await connection.execute(sql)
            console.log(result)
            return result
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

export default rootDao