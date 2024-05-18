import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_maestra_categorias'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('mca_id')
      table.text('mca_nombre')
      table.boolean('mca_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
