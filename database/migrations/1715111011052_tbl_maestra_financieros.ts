import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_maestra_financieros'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('mfi_id')
      table.text('mfi_nombre')
      table.boolean('mfi_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
