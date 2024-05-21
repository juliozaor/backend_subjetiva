import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_maestra_tipo_organizaciones'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('tor_id')
      table.text('tor_nombre')
      table.boolean('tor_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
