import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_concesiones'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('con_id')
      table.text('con_nombre')
      table.integer('con_frm_id').references('frm_id').inTable('tbl_formularios')
      table.boolean('con_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
