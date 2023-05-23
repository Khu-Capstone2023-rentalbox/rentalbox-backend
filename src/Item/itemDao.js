import userService from "./itemService";

const itemDao = {
    insertItem : async(connection, itemName, count, clubId) =>{
        const sql = `INSERT INTO items (name, count, club_id) VALUES (?, ?, ?);`
        try{
            
            await connection.beginTransaction()
            const [queryResult] = await connection.query(sql, [itemName, count, clubId]);
            console.log(queryResult)
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
    selectByItemId : async(connection, itemId) => {
        const sql = `SELECT i.name, i.count, u.name AS owner_name, DATE_FORMAT(DATE_ADD(r.rental_time, INTERVAL r.period DAY), '%Y-%m-%d') as rental_time
        FROM items i
        JOIN rental r ON i.id = r.target
        JOIN user u ON r.owner = u.id
        WHERE i.id = 20;`
        const [queryResult] = await connection.query(sql, itemId);
        return queryResult
    },
    selectMyByItemId : async(connection, itemId, userId) => {
        const sql = `select i.name as itemName, DATE_FORMAT( r.rental_time, '%Y-%m-%d') as rentalDate, DATE_FORMAT( o.overdue_start ,'%Y-%m-%d') as overDueDate, o.charge
        from items as i
            join rental as r
                on r.target = i.id
                    join overdue as o
                        on r.target = o.overdue_item
                            where i.id = ${itemId} and o.overdue_user = '${userId}';`
        const queryResult = await connection.query(sql);
        return queryResult[0]
    },

    selectMyListByUserId : async(connection, userId) => {
        const sql = `select (select name from items where id = r.target) as itemName ,r.target as itemId,DATE_FORMAT(r.rental_time, '%Y-%m-%d') as rentalTime
        from user as u join rental as r
            on r.owner = u.id
                where u.id = r.owner and u.id = '20181023'
                        order by r.rental_time desc;`
        const [queryResult] = await connection.query(sql);
        console.log(queryResult)
        return queryResult
    }
}

export default itemDao