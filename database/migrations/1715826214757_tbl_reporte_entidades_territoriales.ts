import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_reporte_entidades_territoriales'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('ret_id')
      table.text('ret_nombre')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
