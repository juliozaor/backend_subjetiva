import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_maestra_codigos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('cii_id')
      table.text('cii_nombre')
      table.boolean('cii_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
