import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_maestra_domicilios'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('mdo_id')
      table.text('mdo_nombre')
      table.boolean('mdo_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
