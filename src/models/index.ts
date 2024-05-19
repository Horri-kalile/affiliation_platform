import { Sequelize } from "sequelize-typescript"
import dotenv from "dotenv"

dotenv.config()

const sequelize = new Sequelize({
  host: process.env.HOST,
  username: process.env.DB_USER,
  password: process.env.PASSWORD || "",
  database: process.env.DB,
  dialect: "mysql",
  models: [__dirname + "/*.model.ts"],
  logging: false
})
export default sequelize
