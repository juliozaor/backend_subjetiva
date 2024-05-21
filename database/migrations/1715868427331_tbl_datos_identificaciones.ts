import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_datos_identificaciones'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('did_id')
      table.integer('did_pregunta_id').references('idv_id').inTable('tbl_identificacion_vigilados')
      table.string('did_vigilado_id').references('usn_identificacion').inTable('tbl_usuarios')
      table.string('did_valor')
      table.string('did_documento')
      table.string('did_nombre_original')
      table.string('did_ruta')
      table.integer('did_anio_activo')
      table.timestamp('did_creacion', { useTz: true })
      table.timestamp('did_actualizacion', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
