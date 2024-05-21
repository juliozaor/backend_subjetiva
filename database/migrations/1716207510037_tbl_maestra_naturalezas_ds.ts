import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_maestra_naturalezas_ds'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('nat_id')
      table.text('nat_nombre')
      table.boolean('nat_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
