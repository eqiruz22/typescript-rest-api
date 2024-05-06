import express from "express"
import dotnev from "dotenv"
import RoleRoute from "./routes/RoleRoute"
import UserRoute from './routes/UserRoute'
dotnev.config()
const app = express()

app.use(express.json())
app.use(UserRoute)
app.use(RoleRoute)
app.listen(process.env.APP_PORT, () => {
  console.log(`server running on port ${process.env.APP_PORT}`)
})