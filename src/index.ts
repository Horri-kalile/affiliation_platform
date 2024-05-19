import connection from "@/models"
import router from "@/routes"
import swagger from "@/swagger"
import cors from "cors"
import dotenv from "dotenv"
import express, { Express } from "express"
dotenv.config()
const app: Express = express()
const port = process.env.PORT || 3001
console.log("port", port)
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
  credentials: true
}
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use("/api", router)
swagger(app)
;(async () => {
  try {
    await connection.sync({ force: false, alter: true })
    // const data = [
    //   {
    //     id: "1",
    //     label: "Chunky Sneakers Suede Shoes Black",
    //     description: "",
    //     price: 99.9,
    //     image: "https://martinvalen.com/17859-large_default/chunky-sneakers-suede-shoes-black.jpg",
    //     slug: "product-1"
    //   },
    //   {
    //     id: "2",
    //     label: "Men's Bicolor High Trainers In Green-White",
    //     description: "",
    //     price: 110,
    //     image: "https://martinvalen.com/26777-mv_large_default/men-s-bicolor-high-trainers-in-green-white.jpg",
    //     slug: "product-2"
    //   },
    //   {
    //     id: "3",
    //     label: "Men's Low Top Sneakers Crowned Shoes Camo Taupe",
    //     description: "",
    //     price: 110,
    //     image: "https://martinvalen.com/26777-mv_large_default/men-s-bicolor-high-trainers-in-green-white.jpg",
    //     slug: "product-3"
    //   },
    //   {
    //     id: "4",
    //     label: "Men's Low Top Sneakers Crowned Shoes Camo Taupe",
    //     description: "",
    //     price: 110,
    //     image: "https://martinvalen.com/24525-mv_large_default/v-harmony-men-s-white-shoes-with-suede-heel-tab.jpg",
    //     slug: "product-4"
    //   },
    //   {
    //     id: "5",
    //     label: "Men's Low Top Suede Sneakers Shoes Beige",
    //     description: "",
    //     price: 110,
    //     image: "https://martinvalen.com/24185-large_default/men-s-low-top-suede-sneakers-shoes-beige.jpg",
    //     slug: "product-5"
    //   },
    //   {
    //     id: "6",
    //     label: "Bobe Suede Belted New Sneakers Black White",
    //     description: "",
    //     price: 110,
    //     image: "https://martinvalen.com/26145-large_default/bobe-suede-belted-new-sneakers-black-white.jpg",
    //     slug: "product-6"
    //   },
    //   {
    //     id: "7",
    //     label: "Men's Low Top Sneakers Crowned Snake Designer Shoes In White",
    //     description: "",
    //     price: 110,
    //     image:
    //       "https://martinvalen.com/24666-mv_large_default/men-s-low-top-sneakers-crowned-snake-designer-shoes-white.jpg",
    //     slug: "product-7"
    //   },
    //   {
    //     id: "8",
    //     label: "Diagonair Exclusive Striped Suede Sneakers In Black",
    //     description: "",
    //     price: 110,
    //     image: "https://martinvalen.com/24674-mv_large_default/diagonair-exclusive-striped-suede-sneakers-in-black.jpg",
    //     slug: "product-8"
    //   },
    //   {
    //     id: "9",
    //     label: "Bobe Suede Belted New Sneakers Black Beige",
    //     description: "",
    //     price: 110,
    //     image: "https://martinvalen.com/26698-large_default/bobe-suede-belted-new-sneakers-black-beige.jpg",
    //     slug: "product-9"
    //   },
    //   {
    //     id: "10",
    //     label: "Premium Leather Designer Silver Zipped Sneakers Black",
    //     description: "",
    //     price: 110,
    //     image:
    //       "https://martinvalen.com/22377-large_default/premium-leather-designer-silver-zipped-sneakers-black-white.jpg",
    //     slug: "product-10"
    //   }
    // ]

    console.log("database connected")
  } catch (error) {
    console.log(error?.message)
  }
})()
app
  .listen(port, async () => {
    console.log(`Server is running at http://localhost:${port}`)
  })
  .on("error", (err) => {
    console.error("server error", err)
  })
