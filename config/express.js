import express from "express"
import cors from "cors"
import morgan from "morgan";
import userRouter from "../src/User/userRouter";
import itemRouter from "../src/Item/itemRouter";
import searchRouter from "../src/Search/serchRouter";
import rootRouter from "../src/Root/rootRouter";

const app = express();
const logger = morgan("dev")

app.use(logger)
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use(cors())


app.use("files", express.static("files"))
app.use('/', rootRouter)
app.use('/users', userRouter)
app.use('/items', itemRouter)
app.use('/search', searchRouter)



export default app;