import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_datos_ingresos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('din_id')
      table.integer('din_pregunta_id').references('ibe_id').inTable('tbl_ingresos_brutos_entidades_territoriales')
      table.string('din_vigilado_id').references('usn_identificacion').inTable('tbl_usuarios')
      table.string('din_valor')
      table.integer('din_anio')
      table.integer('din_anio_activo')
      table.timestamp('din_creacion', { useTz: true })
      table.timestamp('din_actualizacion', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
