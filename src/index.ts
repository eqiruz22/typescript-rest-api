import express,{Request,Response} from "express"
import dotnev from "dotenv"

dotnev.config()
const app = express()

app.get("/", (req:Request, res:Response) => {
  return res.status(200).json({
      status:true
  })
})
app.listen(process.env.APP_PORT, () => {
  console.log(`server running on port ${process.env.APP_PORT}`)
})