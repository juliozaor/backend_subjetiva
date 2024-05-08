import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_maestra_financieros_n'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('mfn_id')
      table.text('mfn_nombre')
      table.boolean('mfn_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
