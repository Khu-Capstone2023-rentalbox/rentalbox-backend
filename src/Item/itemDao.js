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
    }
}

export default itemDao