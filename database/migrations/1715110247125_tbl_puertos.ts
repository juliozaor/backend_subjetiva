import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_puertos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('prt_id')
      table.text('prt_nombre')
      table.integer('prt_frm_id').references('frm_id').inTable('tbl_formularios')
      table.boolean('prt_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
