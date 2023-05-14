import pool from "../../config/database"
import {getRental, insertOverDue, updateOverdue } from "./batchDao"



export const job = async (req, res) =>{
    const today = new Date();

    let previousDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000 + 9 * 60 * 60 * 1000);

    const targetDatetime = previousDate.toISOString().slice(0, 19).replace('T', ' ');

    console.log(targetDatetime)
    console.log('데이터베이스 작업 시작 : ', today)
    
    const connection = await pool.getConnection(async conn => conn)
    const result = await getRental(connection, targetDatetime);
    console.log(result)
    for(let i = 0; i < result.length; i++){
        const overDueParam = [result[i].owner, 1000, result[i].target]
        console.log(overDueParam)
        const reuslt = await insertOverDue(connection, overDueParam)

        console.log(result)
        // 이 사람들은 처음 연체가 시작된 것이니 연체금액 1000원씩 넣기
    }

    const updateResult = await updateOverdue(connection)

    connection.release()
    // 이후 추가로 연체기간이 늘어난 사람들에 한해 연체금액 추가 업데이트 테스트
}



