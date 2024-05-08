import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_maestra_s_n'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('mas_id')
      table.text('mas_nombre')
      table.boolean('mas_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
