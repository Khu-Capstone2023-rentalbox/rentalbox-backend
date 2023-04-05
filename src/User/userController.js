import errResponseObj from "../../config/errResponseObj"
import { errResponse, response } from "../../config/response"
import responseObj from "../../config/responseObj"
import userService from "./userService"

const userController = {
    startWithJoincode : async(req,res) =>{

    },
    getMyPageData : async(req,res) =>{

    },
    parseMemberList : async(req,res) =>{
        try{
        const {filename, path} = req.file
        const {name} = req.body
        console.log(filename, name)
        if (typeof filename == "undefined" || typeof path == "undefined")
            return res.json(errResponse(errResponseObj.EXCEL_EXIST_ERROR))
        const result = await userService.readExcel(filename, path, name)

        return res.json(response(responseObj, result))

    }catch(e){
        console.log(e)
        let errResponseData = errResponseObj.INTERNAL_ERROR
        errResponseData.message = `type : ${e.name}, message : ${e.message}`
        console.log(errResponseData)
        return res.json(errResponse(errResponseData))
    }
    },
    signUpOrganization : async(req, res) =>{
        try{
            const {list, name:organizationName} = req.body
            console.log("in controller", list, organizationName)
            if (typeof list == "undefined" || typeof organizationName == "undefined")
                return res.json(errResponse(errResponseObj.ORGANIZATION_DATA_EXIT_ERROR))
            const result = await userService.addOrganizationAndMember(organizationName, list)

            if (result.error){
                let errResponseData = errResponseObj.DB_QUERY_ERROR
                errResponseData.message = result.message
                return res.json(errResponse(errResponseData))
            }
            else{
                return res.json(response(responseObj, result))
            }

        }catch(e){
            console.log(e)
            let errResponseData = errResponseObj.INTERNAL_ERROR
            errResponseData.message = `type : ${e.name}, message : ${e.message}`
            console.log(errResponseData)
            return res.json(errResponse(errResponseData))
        }
    }
}

export default userController