import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_maestra_obligatoriedades'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('mob_id')
      table.text('mob_nombre')
      table.boolean('mob_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
