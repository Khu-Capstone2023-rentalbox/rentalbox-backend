const errResponseObj = {
    JWT_EXIT_ERROR : {isSuccess : false, code : 4001, message : "no jwt passed"},
    JWT_AUTH_ERROR : {isSuccess : false, code : 4002, message : "jwt auth error"},
    EXCEL_EXIST_ERROR : {isSuccess : false, code : 4003, message : "please upload excel file"},
    INTERNAL_ERROR : {isSuccess : false, code : 5000, message : null},
    ORGANIZATION_DATA_EXIT_ERROR : {isSuccess : false, code : 4004, message : "please give organization name or list"},
    DB_QUERY_ERROR : {isSuccess : false, code : 4005, message : null},
    SIGN_UP_EXIST_ERROR : {isSuccess : false, code : 4006, message : "please give sign-up data"},
    CLUB_NOT_FOUND : {isSuccess : false, code : 4007, message : "the club that you want is not found"},
    USER_NOT_FOUND : {isSuccess : false, code : 4008, message : "the user is not found"},
    USER_NOT_CLUB : {isSuccess : false, code : 4009, message : "the user is not member of club"},
    KEYWORD_EXIT_ERROR : {isSuccess : false, code : 4010, message : "give search keyword"},
    ITEMNAME_EXIT_ERROR : {isSuccess : false, code : 4011, message : "give item name"},
    ITEMID_EXIT_ERROR : {isSuccess : false, code : 4012, message : "give item id"},
    USERID_EXIT_ERROR : {isSuccess : false, code : 4012, message : "give user id"}
    ITEMID_EXIT_ERROR : {isSuccess : false, code : 4012, message : "give item id"}
}

export default errResponseObj