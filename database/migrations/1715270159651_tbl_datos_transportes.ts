import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_datos_transportes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('fdt_id')
      table.integer('fdt_pregunta_id').references('tsp_id').inTable('tbl_sociedades_portuarias')
      table.string('fdt_vigilado_id').references('usn_identificacion').inTable('tbl_usuarios')
      table.string('fdt_valor')
      table.string('fdt_documento')
      table.string('fdt_nombre_original')
      table.string('fdt_ruta')
      table.integer('fdt_anio_activo')
      table.timestamp('fdt_creacion', { useTz: true })
      table.timestamp('fdt_actualizacion', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
