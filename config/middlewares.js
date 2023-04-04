import privateInfo from "./privateInfo";
import jwt from "jsonwebtoken"
import { errResponse } from "./response";
import errResponseObj from "./errResponseObj";

const middlewares = {
    jwtMiddleware : (req,res,next) =>{
        // read the token from header or url
        const token = req.headers['x-access-token']
        // token does not exist
        if(!token) {
            return res.json(errResponse(errResponseObj.JWT_EXIT_ERROR))
        }
    
        // create a promise that decodes the token
        else{
            const p = new Promise(
                (resolve, reject) => {
                    jwt.verify(token, privateInfo.JWT_SECRET , (err, verifiedToken) => {
                        if(err) reject(err);
                        resolve(verifiedToken)
                    })
                }
            );
        
            // if it has failed to verify, it will return an error message
            const onError = (error) => {
                console.log(error)
                return res.json(errResponse(errResponseObj.JWT_AUTH_ERROR))
            };
            // process the promise
            p.then((verifiedToken)=>{
                //비밀 번호 바뀌었을 때 검증 부분 추가 할 곳
                req.verifiedToken = verifiedToken;
                next();
            }).catch(onError);
        }
    },
    uploadPicture : (req,res,next) =>{
        next()
    }
}

export default middlewares