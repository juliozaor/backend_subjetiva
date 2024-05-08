import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_transitos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('tra_id')
      table.text('tra_nombre')
      table.integer('tra_frm_id').references('frm_id').inTable('tbl_formularios')
      table.boolean('tra_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
