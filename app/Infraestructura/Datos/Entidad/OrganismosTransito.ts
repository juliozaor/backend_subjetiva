
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
export default class TblOrganismosTransitos extends BaseModel {
  public static table = 'tbl_organismos_transitos';
  @column({ isPrimary: true, columnName: 'tot_id' })
  public id: number

  @column({ columnName: 'tot_nombre' }) public nombre: string;

}
