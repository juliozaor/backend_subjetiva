import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_datos_digtamen'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('ddg_id')
      table.integer('ddg_pregunta_id').references('drf_id').inTable('tbl_digtamen_revisor_fiscals')
      table.string('ddg_vigilado_id').references('usn_identificacion').inTable('tbl_usuarios')
      table.string('ddg_valor')
      table.string('ddg_documento')
      table.string('ddg_nombre_original')
      table.string('ddg_ruta')
      table.integer('ddg_anio')
      table.integer('ddg_anio_activo')
      table.timestamp('ddg_creacion', { useTz: true })
      table.timestamp('ddg_actualizacion', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
