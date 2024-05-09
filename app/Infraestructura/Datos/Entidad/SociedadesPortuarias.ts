
import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
export default class TblSociedadesPortuarias extends BaseModel {
  public static table = 'tbl_sociedades_portuarias';
  @column({ isPrimary: true, columnName: 'tsp_id' })
  public id: number

  @column({ columnName: 'tsp_nombre' }) public nombre: string;

}
