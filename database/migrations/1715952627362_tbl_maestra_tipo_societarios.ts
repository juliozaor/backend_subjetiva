import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_maestra_tipo_societarios'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('tso_id')
      table.text('tso_nombre')
      table.boolean('tso_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
