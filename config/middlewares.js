import privateInfo from "./privateInfo";
import jwt from "jsonwebtoken"
import { errResponse } from "./response";
import errResponseObj from "./errResponseObj";
import multer from "multer"
import multerS3 from "multer-s3"
import aws from "aws-sdk"


const storage = multer.diskStorage({
    destination : (req, file, cb) => cb(null, 'files/excels'),
    filename : (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
})

const s3 = new aws.S3({
    credentials : {
        accessKeyId : privateInfo.AWS_ID,
        secretAccessKey : privateInfo.AWS_SECRET
    }   
})

const multerS3Uploader = multerS3({
    s3,
    bucket : 'rentalbox',
    key : (req, file, cb) => cb(null, file.originalname),
    acl : 'public-read'
})

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
    s3Upload : multer({
        dest : 'uploads/images/',
        limits : {
            fieldSize : 10000000,
        },
        storage : multerS3Uploader
    }),
    uploadExel : multer({storage, limits : {fieldSize : 1000000}}),
    serverErrorResolver : (req, res, e) => {
        console.log(e)
        let errResponseData = errResponseObj.INTERNAL_ERROR
        errResponseData.message = `type : ${e.name}, message : ${e.message}`
        console.log(errResponseData)
        return res.status(500).json(errResponse(errResponseData))
    }
}

export default middlewares