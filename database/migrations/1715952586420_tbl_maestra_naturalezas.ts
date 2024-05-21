import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_maestra_naturalezas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('mna_id')
      table.text('mna_nombre')
      table.boolean('mna_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
