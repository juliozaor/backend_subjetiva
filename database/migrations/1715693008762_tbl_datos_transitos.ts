import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_datos_transitos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('dtt_id')
      table.integer('dtt_pregunta_id').references('tot_id').inTable('tbl_organismos_transitos')
      table.string('dtt_vigilado_id').references('usn_identificacion').inTable('tbl_usuarios')
      table.integer('dtt_servicio_id').references('str_id').inTable('tbl_servicios_tercerizados')
      table.string('dtt_valor')
      table.string('dtt_documento')
      table.string('dtt_nombre_original')
      table.string('dtt_ruta')
      table.integer('dtt_anio_activo')
      table.timestamp('dtt_creacion', { useTz: true })
      table.timestamp('dtt_actualizacion', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
