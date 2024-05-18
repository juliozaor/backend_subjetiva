import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_maestra_tipo_entidades_publicas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('tep_id')
      table.text('tep_nombre')
      table.boolean('tep_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
