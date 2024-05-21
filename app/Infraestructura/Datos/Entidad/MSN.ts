import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon';

export class TblMaestraSN extends BaseModel {
  public static table = 'tbl_maestra_s_n';
  @column({ columnName: 'mas_id' })
  public id?: string;
  @column({ columnName: 'mas_nombre' })
  public nombre: string;
  @column({ columnName: 'mas_estado' })
  public estado: boolean;
}


