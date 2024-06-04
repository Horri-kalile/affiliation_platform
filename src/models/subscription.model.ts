import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt
} from "sequelize-typescript"
import Earning from "./earning.model"
import Url from "./url.model"
import User from "./user.model"

@Table({
  tableName: "subscriptions",
  modelName: "Subscription",
  timestamps: true
})
class Subscription extends Model<Subscription> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  declare id?: string

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID
  })
  declare userId: string

  @ForeignKey(() => Url)
  @Column({
    type: DataType.UUID
  })
  declare urlId: string

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID
  })
  declare affiliateId: string

  @CreatedAt
  declare createdAt?: Date

  @UpdatedAt
  declare updatedAt?: Date

  @BelongsTo(() => Url)
  url: Url

  @BelongsTo(() => User, { as: "affiliate", foreignKey: "affiliateId" })
  affiliate: User

  @BelongsTo(() => User, { as: "newUser", foreignKey: "userId" })
  newAffiliate: User
}
export default Subscription
