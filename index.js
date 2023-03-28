import app from "./config/express";
import privateInfo from "./config/privateInfo";

try{
app.listen(privateInfo.PORT, () => console.log(`server is ready! on port ${privateInfo.PORT}`))
}catch(e){
    console.log("something is wrong")
}
