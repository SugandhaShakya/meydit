
import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Job from './Job'

export default class JobImage extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public job_id: number

  @column()
  public image_url: string

  @column()
  public image: string 

  @belongsTo(() => Job)
  public job: BelongsTo<typeof Job>
}
