import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_maestra_tipo_entidades'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('ten_id')
      table.text('ten_nombre')
      table.boolean('ten_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
