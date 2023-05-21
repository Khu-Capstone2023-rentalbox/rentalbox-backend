const itemDao = {
    insertItem : async(connection, itemName, count) =>{
        const sql = `INSERT INTO items (name, count) VALUES (?, ?);`
        const [queryResult] = await connection.query(sql, [itemName, count]);
        return queryResult
    },
    selectByItemId : async(connection, itemId) => {
        const sql = `SELECT i.name, i.count, u.name AS owner_name, r.rental_time
                    FROM items i
                    JOIN rental r ON i.id = r.target
                    JOIN user u ON r.owner = u.id
                    WHERE i.id = ?;`
        const [queryResult] = await connection.query(sql, itemId);
        return queryResult
    },
    selectMyByItemId : async(connection, itemId) => {
        const sql = `SELECT items.id, items.name AS target_name, rental.rental_time, rental.period
                    FROM rental
                    JOIN items ON rental.target = items.id
                    WHERE rental.id = ?;`
        const [queryResult] = await connection.query(sql, itemId);
        return queryResult[0]
    },
}

export default itemDao