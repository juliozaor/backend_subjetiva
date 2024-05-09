import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_empresas_transportes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('tet_id')
      table.text('tet_nombre')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
