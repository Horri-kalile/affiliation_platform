import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database"; // Import your Sequelize instance

class User extends Model {
  public id!: number;
  public address!: string;
  public password!: string;
  public role!: string; 
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING, // Assuming role will be a string, adjust data type if necessary
      allowNull: false,
    },
  },
  {
    tableName: "users", // You can specify the table name if needed
    sequelize, // Pass the Sequelize instance
  }
);

// Create the table if it doesn't exist
User.sync({ force: false }).then(() => {
  console.log("User table created or already exists");
});

export default User;
