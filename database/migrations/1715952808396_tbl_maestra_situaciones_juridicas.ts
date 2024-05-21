import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_maestra_situaciones_juridicas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('msj_id')
      table.text('msj_nombre')
      table.boolean('msj_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
