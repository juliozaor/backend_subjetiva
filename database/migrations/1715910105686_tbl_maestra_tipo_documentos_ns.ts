import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_maestra_tipo_documentos_ns'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('tdn_id')
      table.text('tdn_nombre')
      table.boolean('tdn_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
