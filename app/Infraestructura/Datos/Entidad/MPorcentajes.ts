import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon';

export class TblMaestraPorcentajes extends BaseModel {
  public static table = 'tbl_maestra_porcentajes';
  @column({ columnName: 'mpr_id' })
  public id?: string;
  @column({ columnName: 'mpr_nombre' })
  public nombre: string;
  @column({ columnName: 'mpr_estado' })
  public estadi: boolean;
}


