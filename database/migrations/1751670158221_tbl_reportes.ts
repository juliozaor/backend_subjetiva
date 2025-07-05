import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_reportes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('tbr_id')
      table.string('tbr_vigilado_id').references('usn_identificacion').inTable('tbl_usuarios')
      table.integer('tbr_estado_id').references('esv_id').inTable('tbl_estados_vigilados')
      table.integer('tbr_formulario_id').references('frm_id').inTable('tbl_formularios')
      table.integer('tbr_anio_activo')
      table.timestamp('tbr_creacion', { useTz: true })
      table.timestamp('tbr_actualizacion', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
