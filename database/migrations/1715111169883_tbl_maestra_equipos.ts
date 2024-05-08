import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_maestra_equipos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('meq_id')
      table.text('meq_nombre')
      table.boolean('meq_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
