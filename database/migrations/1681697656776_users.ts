import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Roles from 'App/Enums/Roles'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('first_name',80).notNullable()
      table.string('last_name',80).notNullable()
      table.string('phone', 20).notNullable()
      table.string('address', 255).notNullable()
      table.string('postcode', 20).notNullable()
      table.string('state', 20).notNullable()
      table.integer('role_id').unsigned().references('id').inTable('roles').defaultTo(Roles.CUSTOMER)
      table.string('email', 255).notNullable().unique()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.raw('CURRENT_TIMESTAMP'))
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
