import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon';

export class TblMaestraInversiones extends BaseModel {
  public static table = 'tbl_maestra_inversiones';
  @column({ columnName: 'miv_id' })
  public id?: string;
  @column({ columnName: 'miv_nombre' })
  public nombre: string;
  @column({ columnName: 'miv_estado' })
  public estadi: boolean;
}


