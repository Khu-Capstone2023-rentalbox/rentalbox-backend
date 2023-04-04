const errResponseObj = {
    JWT_EXIT_ERROR : {isSuccess : false, code : 4001, message : "no jwt passed"},
    JWT_AUTH_ERROR : {isSuccess : false, code : 4002, message : "jwt auth error"}
}

export default errResponseObj