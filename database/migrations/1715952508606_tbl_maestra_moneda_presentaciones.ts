import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_maestra_moneda_presentaciones'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('mmp_id')
      table.text('mmp_nombre')
      table.boolean('mmp_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
