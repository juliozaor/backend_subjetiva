import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_sociedades_portuarias'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('tsp_id')
      table.text('tsp_nombre')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
