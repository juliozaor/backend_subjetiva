import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_maestra_organizaciones'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('mor_id')
      table.text('mor_nombre')
      table.boolean('mor_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
