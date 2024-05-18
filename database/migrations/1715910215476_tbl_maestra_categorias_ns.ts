import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_maestra_categorias_ns'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('cns_id')
      table.text('cns_nombre')
      table.boolean('cns_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
