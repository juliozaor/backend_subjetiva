
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm';
export default class TblServiciosTerverizados extends BaseModel {
  public static table = 'tbl_servicios_tercerizados';
  @column({ isPrimary: true, columnName: 'str_id' })
  public id: number

  @column({ columnName: 'str_nombre' }) public nombre: string;


}
