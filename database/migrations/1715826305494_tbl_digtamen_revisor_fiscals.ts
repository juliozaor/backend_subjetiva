import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_digtamen_revisor_fiscals'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('drf_id')
      table.text('drf_nombre')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
