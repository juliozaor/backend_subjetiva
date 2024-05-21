import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_maestra_tipo_vigilados'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('mtv_id')
      table.text('mtv_nombre')
      table.boolean('mtv_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
