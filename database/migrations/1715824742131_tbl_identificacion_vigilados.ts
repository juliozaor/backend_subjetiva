import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_identificacion_vigilados'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('idv_id')
      table.text('idv_nombre')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
