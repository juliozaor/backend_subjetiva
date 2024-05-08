import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_maestra_periodos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('mpo_id')
      table.text('mpo_nombre')
      table.boolean('mpo_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
