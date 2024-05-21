import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_maestra_hipotesis_marchas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('mhm_id')
      table.text('mhm_nombre')
      table.boolean('mhm_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
