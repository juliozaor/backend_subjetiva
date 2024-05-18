import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_maestra_dictamenes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('mdi_id')
      table.text('mdi_nombre')
      table.boolean('mdi_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
