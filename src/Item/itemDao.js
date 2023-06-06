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
        const sql = `select name, count from items where id = ${itemId};`
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
                where u.id = r.owner and u.id = '${userId}'
                        order by r.rental_time desc;`
        const [queryResult] = await connection.query(sql);
        console.log(queryResult)
        return queryResult
    },
    selectBookIdByName : async(connection, title) =>{
        const sql = `select id, count from items where name = '${title}'`
        const [queryResult] = await connection.query(sql)
        return queryResult
    },
    insertRental : async(connection, bookId, userId) =>{
        const sql = `insert into rental(owner, target, period) VALUES (${userId},${bookId},${7});`
        try{
            await connection.beginTransaction()
            const [queryResult] = await connection.query(sql);
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
    calcCountItem : async(connection, bookId) =>{
        const sql = `update items set count = count - 1 where id =${bookId};`
        console.log(sql)
        try{
            await connection.beginTransaction()
            const [queryResult] = await connection.query(sql)
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
    addReturnItem : async(connection, bookId) =>{
        const sql = `update items set count = count + 1 where id =${bookId};`
        
        const [queryResult] = await connection.query(sql)

        return queryResult
    },
    returnRental : async(connection, userId ,bookId) =>{
        const sql = `delete from rental where owner = '${userId}' and target = ${bookId};`

        console.log(sql)
        const [queryResult] = await connection.query(sql)

        return queryResult
    },
    deleteOverDue : async(connection, userId, bookId) =>{
        const sql = `delete from overdue where  overdue_user = '${userId}' and overdue_item = ${bookId};`

        const [queryResult] = await connection.query(sql)

        return queryResult
    },
    selectRentalById : async(connection, itemId) => {
        const sql = `select (select name from user where owner = user.id) as owner_name, DATE_FORMAT(DATE_ADD(rental_time, INTERVAL period DAY), '%Y-%m-%d') as return_time from rental where target = ${itemId};`

        const [queryResult] = await connection.query(sql)

        return queryResult
    }
}

export default itemDao