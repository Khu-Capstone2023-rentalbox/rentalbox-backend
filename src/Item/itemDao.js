const itemDao = {
    insertItem : async(connection, itemName, count) =>{
        const sql = `INSERT INTO items (name, count) VALUES (?, ?);`
        const [queryResult] = await connection.query(sql, [itemName, count]);
        return queryResult
    },
}

export default itemDao