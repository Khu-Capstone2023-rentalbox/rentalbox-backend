export const response = (responseObj,data) =>{
    return{
        isSuccess : responseObj.isSuccess,
        code : responseObj.code,
        message : responseObj.message,
        data : data
    }
}

export const errResponse = (responseObj) =>{
    return{
        isSuccess : responseObj.isSuccess,
        code : responseObj.code,
        message : responseObj.message,
        data : null
    }
}
