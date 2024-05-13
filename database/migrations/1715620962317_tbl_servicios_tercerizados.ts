import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_servicios_tercerizados'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('str_id')
      table.text('str_nombre')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
