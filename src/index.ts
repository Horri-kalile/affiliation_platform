import express, { Express } from "express"
import cors from "cors"
import dotenv from "dotenv"
import connection from "./config/database"
import swagger from "./swagger"
import User from "./models/users.model"
import userRoutes from "./routes/users"

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3307

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
  credentials: true
}

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use("/api", userRoutes)

swagger(app)
;(async () => {
  try {
    await connection.sync({ force: false })

    // Create users if the table is empty
    const usersCount = await User.count()
    if (usersCount === 0) {
      console.log("No initial users found. Database is empty.")
    }

    console.log("Database connected")
  } catch (error) {
    console.log(error.message)
  }
})()

app
  .listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
  })
  .on("error", (err) => {
    console.error("Server error", err)
  })

