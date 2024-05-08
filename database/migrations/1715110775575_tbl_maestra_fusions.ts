import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_maestra_fusiones'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('mfu_id')
      table.text('mfu_nombre')
      table.boolean('mfu_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
