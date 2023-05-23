import app from "./config/express";
import privateInfo from "./config/privateInfo";
import schedule from "node-schedule"
import { job } from "./src/batch/batch";


try{
app.listen(privateInfo.PORT, () => console.log(`server is ready! on port ${privateInfo.PORT}`))
}catch(e){
    console.log("something is wrong")
}

schedule.scheduleJob('26 15 * * *', job)