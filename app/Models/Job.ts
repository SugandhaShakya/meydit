import { DateTime } from 'luxon'
import { BaseModel, column,BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class Job extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({columnName: 'userId'})
  public userId: number

  @column()
  public type_of_clothing: string

  @column()
  public description: string

  @column()
  public budget: number

  @column()
  public status: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public customer: BelongsTo<typeof User>
}
