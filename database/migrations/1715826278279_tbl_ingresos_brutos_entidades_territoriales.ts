import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_ingresos_brutos_entidades_territoriales'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('ibe_id')
      table.text('ibe_nombre')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
