import { Sequelize } from "sequelize";
import dotenv from "dotenv"

dotenv.config()

const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USERNAME as string
const dbHost = process.env.DB_HOST as string
const dbPassword = process.env.DB_PASSWORD as string
const dbDialect = "mysql"

const sequelizeConnect = new Sequelize(dbName,dbUser,dbPassword,{
    host:dbHost,
    dialect:dbDialect
})

export default sequelizeConnect
