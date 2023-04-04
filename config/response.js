export const response = (responseObj,data) =>{
    return{
        isSuccess : responseObj.isSuccess,
        code : responseObj.code,
        message : response.message,
        data : data
    }
}

export const errResponse = (responseObj) =>{
    return{
        isSuccess : responseObj.isSuccess,
        code : responseObj.code,
        message : response.message,
        data : null
    }
}
