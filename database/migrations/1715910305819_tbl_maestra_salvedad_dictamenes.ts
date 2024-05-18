import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_maestra_salvedad_dictamenes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('msd_id')
      table.text('msd_nombre')
      table.boolean('msd_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
