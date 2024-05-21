import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon';

export class TblMaestraPeriodos extends BaseModel {
  public static table = 'tbl_maestra_periodos';
  @column({ columnName: 'mpo_id' })
  public id?: string;
  @column({ columnName: 'mpo_nombre' })
  public nombre: string;
  @column({ columnName: 'mpo_estado' })
  public estado: boolean;
}


