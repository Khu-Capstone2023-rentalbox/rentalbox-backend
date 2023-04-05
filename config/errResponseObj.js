const errResponseObj = {
    JWT_EXIT_ERROR : {isSuccess : false, code : 4001, message : "no jwt passed"},
    JWT_AUTH_ERROR : {isSuccess : false, code : 4002, message : "jwt auth error"},
    EXCEL_EXIST_ERROR : {isSuccess : false, code : 4003, message : "please upload excel file"},
    INTERNAL_ERROR : {isSuccess : false, code : 5000, message : null},
    ORGANIZATION_DATA_EXIT_ERROR : {isSuccess : false, code : 4004, message : "please give organization name or list"},
    DB_QUERY_ERROR : {isSuccess : false, code : 4005, message : null}
}

export default errResponseObj