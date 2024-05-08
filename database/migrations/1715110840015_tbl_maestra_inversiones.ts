import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_maestra_inversiones'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('miv_id')
      table.text('miv_nombre')
      table.boolean('miv_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
