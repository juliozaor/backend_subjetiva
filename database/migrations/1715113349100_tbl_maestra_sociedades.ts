import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_maestra_sociedades'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('mso_id')
      table.text('mso_nombre')
      table.boolean('mso_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
