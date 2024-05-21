import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_maestra_tipo_entidadesNs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('tet_id')
      table.text('tet_nombre')
      table.boolean('tet_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
