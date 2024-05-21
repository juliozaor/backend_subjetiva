import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_datos_portuarias'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('fdp_id')
      table.integer('fdp_pregunta_id').references('tsp_id').inTable('tbl_sociedades_portuarias')
      table.string('fdp_vigilado_id').references('usn_identificacion').inTable('tbl_usuarios')
      table.string('fdp_valor')
      table.string('fdp_documento')
      table.string('fdp_nombre_original')
      table.string('fdp_ruta')
      table.integer('fdp_anio_activo')
      table.timestamp('fdp_creacion', { useTz: true })
      table.timestamp('fdp_actualizacion', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
