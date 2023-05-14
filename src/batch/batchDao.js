
export const getRental  = async(connection, time) =>{
    const sql = `select owner, target from rental where rental_time < '${time}' and (owner, target) not in (select overdue_user, overdue_item from overdue);`

    console.log(sql)
    const [result] = await connection.query(sql);
    return result
}

export const insertOverDue = async(connection, param) =>{

    console.log("hihi")
    const sql = `insert into overdue(overdue_user, charge, overdue_item) VALUES (?,?,?);`

    try{
        await connection.beginTransaction()
        const result = await connection.query(sql, param)
        console.log(result)
        await connection.commit()

        
    }catch(e){
        console.log(e)
        await connection.rollback()
        return {
            error : true,
            message : `error type : ${e.name}, error message : ${e.message}`
        } 
    }
}

export const updateOverdue = async(connection, time) => {
    const sql = `UPDATE overdue
    SET charge = overdue.charge + 100 * DATEDIFF(NOW(), overdue_start)
    WHERE DATEDIFF(NOW(), overdue_start) > 0;`

    try{
        const result = await connection.query(sql)
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