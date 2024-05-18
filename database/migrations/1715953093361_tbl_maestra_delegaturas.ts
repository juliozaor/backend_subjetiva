import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_maestra_delegaturas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('mde_id')
      table.text('mde_nombre')
      table.boolean('mde_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
