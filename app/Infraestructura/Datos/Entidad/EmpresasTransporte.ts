
import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
export default class TblEmpresasTransportes extends BaseModel {
  public static table = 'tbl_empresas_transportes';
  @column({ isPrimary: true, columnName: 'tet_id' })
  public id: number

  @column({ columnName: 'tet_nombre' }) public nombre: string;

}
