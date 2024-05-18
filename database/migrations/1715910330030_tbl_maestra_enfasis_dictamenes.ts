import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_maestra_enfasis_dictamenes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('edi_id')
      table.text('edi_nombre')
      table.boolean('edi_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
