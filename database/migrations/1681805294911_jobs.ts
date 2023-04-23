import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'jobs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.integer('userId').unsigned().references('id').inTable('users');
      table.string('type_of_clothing').notNullable();
      table.text('description').notNullable();
      table.decimal('budget',8, 2).notNullable();
      table.string('status').notNullable().defaultTo('pending');


      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.raw('CURRENT_TIMESTAMP'))
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
