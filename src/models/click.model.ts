import { Model, DataTypes } from "sequelize"
import sequelize from "../config/database"

class Click extends Model {
  // Define model attributes here
}

Click.init(
  {
    id_click: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ipaddress: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    clickdate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "Click",
    tableName: "click", // Make sure this matches your table name in the database
    timestamps: false // Optional: Set timestamps to false if you don't have createdAt and updatedAt columns
  }
)

export { Click }
