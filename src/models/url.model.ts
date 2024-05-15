import { Model, DataTypes } from "sequelize"
import sequelize from "../config/database"

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

export { Url }
