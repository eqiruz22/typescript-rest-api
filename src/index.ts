import express from "express"
import dotnev from "dotenv"
import RoleRoute from "./routes/RoleRoute"
dotnev.config()
const app = express()

app.use(RoleRoute)
app.listen(process.env.APP_PORT, () => {
  console.log(`server running on port ${process.env.APP_PORT}`)
})