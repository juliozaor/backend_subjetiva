import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_maestra_s_n_n'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('msn_id')
      table.text('msn_nombre')
      table.boolean('msn_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
