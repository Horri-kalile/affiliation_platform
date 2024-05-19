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
import Url from "./url.model"

@Table({
  tableName: "users",
  modelName: "User",
  timestamps: true
})
class User extends Model<User> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  declare id?: string

  @Column({
    type: DataType.STRING
  })
  declare email: string

  @Column({
    type: DataType.STRING
  })
  declare password: string

  @Column({
    type: DataType.STRING
  })
  declare role: string

  @Column({
    type: DataType.STRING,
    defaultValue: "waiting list"
  })
  declare status?: string

  @CreatedAt
  declare createdAt?: Date

  @UpdatedAt
  declare updatedAt?: Date

  @HasMany(() => Click)
  clicks: Click[]

  @HasMany(() => Subscription)
  subscriptions: Subscription[]

  @BelongsToMany(() => Url, () => AffiliateUrl)
  urls: Url[]
}
export default User
