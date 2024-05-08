import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_formulario_vigilados'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('fvi_id')
      table.integer('fvi_frm_id').references('frm_id').inTable('tbl_formularios')
      table.string('fvi_vigilado_id').references('usn_identificacion').inTable('tbl_usuarios')
      table.boolean('fvi_estado').defaultTo(true)
      table.timestamp('fvi_creacion', { useTz: true })
      table.timestamp('fvi_actualizacion', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
