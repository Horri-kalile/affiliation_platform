import { Model, DataTypes } from "sequelize"
import sequelize from "../config/database"
import { Banner } from "./banner.model"
import { Click } from "./click.model"

class Url extends Model {
  // Define model attributes here
}

Url.init(
  {
    id_Url: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    URL: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    dateAdded: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "Url",
    tableName: "url", // Make sure this matches your table name in the database
    timestamps: false // Optional: Set timestamps to false if you don't have createdAt and updatedAt columns
  }
)
Url.hasMany(Banner, { foreignKey: "UrlId", as: "banners" })
Url.hasMany(Click, { foreignKey: "UrlId", as: "clicks" })
export { Url }
