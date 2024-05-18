import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon';

export class TblMaestraSNN extends BaseModel {
  public static table = 'tbl_maestra_s_n_n';
  @column({ columnName: 'msn_id' })
  public id?: string;
  @column({ columnName: 'msn_nombre' })
  public nombre: string;
  @column({ columnName: 'msn_estado' })
  public estado: boolean;
}


