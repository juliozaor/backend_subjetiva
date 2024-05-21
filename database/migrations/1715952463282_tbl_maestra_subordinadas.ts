import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_maestra_subordinadas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('msu_id')
      table.text('msu_nombre')
      table.boolean('msu_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
