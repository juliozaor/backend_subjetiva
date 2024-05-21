import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_log_estados'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('tle_id')
      table.string('tle_vigilado_id').references('usn_identificacion').inTable('tbl_usuarios')
      table.integer('tle_estado_id').references('esv_id').inTable('tbl_estados_vigilados')
      table.integer('tle_formulario_id').references('frm_id').inTable('tbl_formularios')
      table.integer('tle_anio_activo')
      table.timestamp('tle_creacion', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
