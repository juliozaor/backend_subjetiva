import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_estados_servicios_tercerizados'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('tst_id')
      table.string('tst_razon_social', 100)
      table.integer('tst_tipo_nit')
      table.integer('tst_nit')
      table.integer('tst_digito_verificacion')
      table.integer('tst_tipo_oganizacion')
      table.integer('tst_apoya_terceros')
      table.integer('tst_proceso_adjudicacion')
      table.boolean('tst_gruas').defaultTo(false)
      table.boolean('tst_patios').defaultTo(false)
      table.boolean('tst_tramites_transito').defaultTo(false)
      table.boolean('tst_deteccion_infracciones').defaultTo(false)
      table.boolean('tst_procesos_contravencionales').defaultTo(false)
      table.boolean('tst_procesos_cobro_coactivo').defaultTo(false)
      table.boolean('tst_procesos_cobro_persuasivo').defaultTo(false)
      table.boolean('tst_recaudo_multas').defaultTo(false)
      table.boolean('tst_otros').defaultTo(false)
      table.string('tst_vigilado_id').references('usn_identificacion').inTable('tbl_usuarios')
      table.integer('tst_anio_activo')
      table.timestamp('tst_creacion', { useTz: true })
      table.timestamp('tst_actualizacion', { useTz: true })
     
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
