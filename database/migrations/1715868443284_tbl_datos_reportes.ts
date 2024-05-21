import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_datos_reportes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('dre_id')
      table.integer('dre_pregunta_id').references('ret_id').inTable('tbl_reporte_entidades_territoriales')
      table.string('dre_vigilado_id').references('usn_identificacion').inTable('tbl_usuarios')
      table.string('dre_valor')
      table.string('dre_documento')
      table.string('dre_nombre_original')
      table.string('dre_ruta')
      table.integer('dre_anio_activo')
      table.timestamp('dre_creacion', { useTz: true })
      table.timestamp('dre_actualizacion', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
