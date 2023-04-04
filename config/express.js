import express from "express"
import cors from "cors"
import morgan from "morgan";
import userRouter from "../src/User/userRouter";
import itemRouter from "../src/Item/itemRouter";

const app = express();
const logger = morgan("dev")

app.use(logger)
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use(cors())

app.use('/users', userRouter)
app.use('/items', itemRouter)



export default app;