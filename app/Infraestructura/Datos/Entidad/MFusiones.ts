import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon';

export class TblMaestraFusiones extends BaseModel {
  public static table = 'tbl_maestra_fusiones';
  @column({ columnName: 'mfu_id' })
  public id?: string;
  @column({ columnName: 'mfu_nombre' })
  public nombre: string;
  @column({ columnName: 'mfu_estado' })
  public estado: boolean;
}


