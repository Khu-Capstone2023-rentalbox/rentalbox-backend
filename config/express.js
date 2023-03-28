import express from "express"
import cors from "cors"
import morgan from "morgan";

const app = express();
const logger = morgan("dev")

app.use(logger)
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use(cors())



export default app;