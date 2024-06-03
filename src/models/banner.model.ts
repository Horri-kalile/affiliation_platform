import { Column, CreatedAt, DataType, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript"

@Table({
  tableName: "banners",
  modelName: "Banner",
  timestamps: true
})
class Banner extends Model<Banner> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  id: string

  @Column({
    type: DataType.TEXT
  })
  src: string

  @Column({
    type: DataType.STRING
  })
  urlId: string

  @CreatedAt
  createdAt: Date

  @UpdatedAt
  updatedAt: Date
}

export default Banner
