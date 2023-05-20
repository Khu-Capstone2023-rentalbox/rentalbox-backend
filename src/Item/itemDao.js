import userService from "./itemService";

const itemDao = {
    insertItem : async(connection, itemName, count, clubId) =>{
        const sql = `INSERT INTO items (name, count, club_id) VALUES (?, ?, ?);`
        const [queryResult] = await connection.query(sql, [itemName, count, clubId]);
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
    selectMyListByUserId : async(connection, userId, startIndex, endIndex) => {
        const sql = `SELECT i.id AS item_id, i.name AS item_name, r.rental_time
                    FROM items i
                    JOIN rental r ON i.id = r.target
                    WHERE r.owner = ?
                    LIMIT ?, ?;`
        const [queryResult] = await connection.query(sql, [userId, startIndex, endIndex]);
        console.log(queryResult)
        return queryResult
    }
}

export default itemDao