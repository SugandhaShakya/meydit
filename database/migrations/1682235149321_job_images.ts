import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'job_images'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('job_id').unsigned().references('jobs.id').onDelete('CASCADE')
      table.string('image_url').notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.raw('CURRENT_TIMESTAMP'))
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
