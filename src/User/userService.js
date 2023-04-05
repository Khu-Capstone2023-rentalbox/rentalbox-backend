import xlsx from "xlsx"
import path from "path"
import pool from "../../config/database"
import userDao from "./userDao"

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
        if (organizationResult.error)
            return organizationResult
        else{
            const memberResult = await userDao.insertUserBulk(connection,list,organizationResult.insertId, list.length)

            if (memberResult.error)
                return memberResult
            return {
                insertedOrganization : organizationResult.insertId,
                insertedMemberCount : memberResult.insertedCount
            }
        }
    }
    
}

export default userService