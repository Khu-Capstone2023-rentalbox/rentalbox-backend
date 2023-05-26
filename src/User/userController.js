import errResponseObj from "../../config/errResponseObj"
import middlewares from "../../config/middlewares"
import { errResponse, response } from "../../config/response"
import responseObj from "../../config/responseObj"
import userProvider from "./userProvider"
import userService from "./userService"

const userController = {
    startWithJoincode : async(req,res) =>{
        try{
            const {memberId, clubId} = req.body
            if (typeof memberId == "undefined" || typeof clubId == "undefined")
                return res.status(400).json(errResponse(errResponseObj.SIGN_UP_EXIST_ERROR))
            
            const result = await userService.loginUser(memberId, clubId)
            console.log(result)
            const jsonObj = {
                clubName : result.clubName,
                token : result.token
            }
            if (result.error){
                return res.status(404).json(result.obj)
            }
            else{
                return res.json(response(responseObj, jsonObj))
            }
        }catch(e){
            middlewares.serverErrorResolver(req,res,e)
        }
    },
    getMyPageData : async(req,res) =>{

    },
    parseMemberList : async(req,res) =>{
        try{
        const {filename, path} = req.file
        const {name} = req.body
        console.log(filename, name)
        if (typeof filename == "undefined" || typeof path == "undefined")
            return res.status(400).json(errResponse(errResponseObj.EXCEL_EXIST_ERROR))
        const result = await userService.readExcel(filename, path, name)

        return res.json(response(responseObj, result))

    }catch(e){
        console.log(e)
        let errResponseData = errResponseObj.INTERNAL_ERROR
        errResponseData.message = `type : ${e.name}, message : ${e.message}`
        console.log(errResponseData)
        return res.status(500).json(errResponse(errResponseData))
    }
    },
    signUpOrganization : async(req, res) =>{
        try{
            const {name:organizationName} = req.body
            const {filename, path} = req.file
            console.log("in controller",filename, organizationName)
            if (typeof filename == "undefined" || typeof path == "undefined")
            return res.status(400).json(errResponse(errResponseObj.EXCEL_EXIST_ERROR))
            const excel = await userService.readExcel(filename, path, organizationName)
            console.log(excel)

            const result = await userService.addOrganizationAndMember(organizationName, excel)

            if (result.error){
                let errResponseData = errResponseObj.DB_QUERY_ERROR
                errResponseData.message = result.message
                return res.status(500).json(errResponse(errResponseData))
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