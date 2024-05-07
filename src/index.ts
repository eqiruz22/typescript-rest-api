import express,{Request,Response} from "express"
import dotnev from "dotenv"
import RoleRoute from "./routes/RoleRoute"
import UserRoute from './routes/UserRoute'
import morgan from "morgan"
import fs from "fs"
import path from "path"
dotnev.config()
const app = express()

app.use(express.json())
app.use(morgan('dev',{
  skip:function(req:Request,res:Response){return res.statusCode < 400}
}))
const accessLog = fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'})
app.use(morgan('combined',{stream:accessLog}))
app.use(UserRoute)
app.use(RoleRoute)
app.listen(process.env.APP_PORT, () => {
  console.log(`server running on port ${process.env.APP_PORT}`)
})