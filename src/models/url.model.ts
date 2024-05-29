import {
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt
} from "sequelize-typescript"
import AffiliateUrl from "./affiliateUrl.model"
import Click from "./click.model"
import Subscription from "./subscription.model"
import User from "./user.model"

@Table({
  tableName: "urls",
  modelName: "Url",
  timestamps: true
})
class Url extends Model<URL> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  declare id?: string

  @Column({
    type: DataType.TEXT
  })
  declare url: string

  @Column({
    type: DataType.STRING
  })
  declare CompanyName: string

  @Column({
    type: DataType.STRING
  })
  declare Description: string

  @CreatedAt
  declare createdAt?: Date

  @UpdatedAt
  declare updatedAt?: Date

  @BelongsToMany(() => User, () => AffiliateUrl)
  affiliates: User[]

  @HasMany(() => Click)
  clicks: Click[]

  @HasMany(() => Subscription)
  subscriptions: Subscription[]
}
export default Url
