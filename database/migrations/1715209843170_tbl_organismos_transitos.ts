import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_organismos_transitos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('tot_id')
      table.text('tot_nombre')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
