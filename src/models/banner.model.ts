import { Model, DataTypes } from "sequelize"
import sequelize from "../config/database"

class Banner extends Model {
  // Define model attributes here
}

Banner.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Url: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "Banner",
    tableName: "banner", // Make sure this matches your table name in the database
    timestamps: false // Optional: Set timestamps to false if you don't have createdAt and updatedAt columns
  }
)

export { Banner }
