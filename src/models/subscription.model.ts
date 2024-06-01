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
  declare NewAffiliateId: string

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

  @Column({
    type: DataType.DECIMAL(10, 2)
  })
  declare earnings: number

  @CreatedAt
  declare createdAt?: Date

  @UpdatedAt
  declare updatedAt?: Date

  @BelongsTo(() => Url)
  url: Url

  @BelongsTo(() => User)
  affiliate: User
}
export default Subscription
