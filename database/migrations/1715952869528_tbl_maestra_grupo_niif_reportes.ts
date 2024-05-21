import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_maestra_grupo_niif_reportes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('gnr_id')
      table.text('gnr_nombre')
      table.boolean('gnr_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
