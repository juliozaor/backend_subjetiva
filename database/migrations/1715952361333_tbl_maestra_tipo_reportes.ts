import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_maestra_tipo_reportes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('tre_id')
      table.text('tre_nombre')
      table.boolean('tre_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
