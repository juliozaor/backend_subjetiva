import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_maestra_tipo_documentos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('mtd_id')
      table.text('mtd_nombre')
      table.boolean('mtd_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
