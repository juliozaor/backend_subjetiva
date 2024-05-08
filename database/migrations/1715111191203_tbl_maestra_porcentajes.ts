import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_maestra_porcentajes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('mpr_id')
      table.text('mpr_nombre')
      table.boolean('mpr_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
