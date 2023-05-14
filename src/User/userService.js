import xlsx from "xlsx"
import path from "path"
import pool from "../../config/database"
import userDao from "./userDao"
import userProvider from "./userProvider"
import { errResponse } from "../../config/response"
import errResponseObj from "../../config/errResponseObj"
import jwt from "jsonwebtoken"
import privateInfo from "../../config/privateInfo"

const userService = {
    readExcel : async(filename, filepath, name) => {
        console.log("filename in service", filename)
        console.log("path in service", filepath)

        const realPath = path.join(__dirname, '../../', 'files', 'excels', filename)
        const targetWorkbook = xlsx.readFile(realPath)
        const sheetName = targetWorkbook.SheetNames[0]
        const data = xlsx.utils.sheet_to_json(targetWorkbook.Sheets[sheetName], {header : 1})

        let memberList = null
        const testNum = parseInt(data[0][0])
        if (isNaN(testNum)){
            memberList = data.slice(1)
        }else{
            memberList = data
        }


        memberList = memberList.map((element) => `${element[0]} ${element[1]}`)
        console.log(memberList)
        return memberList
    },
    addOrganizationAndMember : async(organizationName, list) =>{
        console.log("in service", organizationName, list)

        const connection = await pool.getConnection(async conn => conn)

        const insesrtOrganizationParam = [organizationName, list.length]
        
        const organizationResult = await userDao.insertGroup(connection, insesrtOrganizationParam)
        if (organizationResult.error){
            connection.release()
            return organizationResult
        }
        else{
            const memberResult = await userDao.insertUserBulk(connection,list,organizationResult.insertId, list.length)

            if (memberResult.error){
                connection.release()
                return memberResult
            }
            connection.release()
            return {
                insertedOrganization : organizationResult.insertId,
                insertedMemberCount : memberResult.insertedCount
            }
        }
    },
    loginUser : async(memberId, clubId) =>{
        const clubExist = await userProvider.getClubById(clubId)
        const userExist = await userProvider.getUserById(memberId)
        if (clubExist.length == 0)
            return { error : true, obj : errResponse(errResponseObj.CLUB_NOT_FOUND)}
        else if (userExist.length == 0)
            return{ error : true, obj: errResponse(errResponseObj.USER_NOT_FOUND)}
        else{
            console.log(clubExist[0].id, userExist[0].id, userExist[0].club_id)
            if (clubExist[0].id === userExist[0].club_id){
                console.log(userExist[0])
            let token = await jwt.sign({
                userId : userExist[0].id,
                userClub : userExist[0].club_id
            },
            privateInfo.JWT_SECRET,
            {
                expiresIn : "30d",
                subject : "userInfo"
            });
                return {error : false, token}
        }
            else
                return {error : true, obj : errResponse(errResponseObj.USER_NOT_CLUB)}
        }
    }
    
}

export default userService