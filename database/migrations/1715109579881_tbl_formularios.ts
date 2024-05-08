import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_formularios'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('frm_id')
      table.string('frm_nombre', 200)
      table.string('frm_delegatura', 200)
      table.string('frm_ruta', 200)
      table.boolean('frm_estado')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
