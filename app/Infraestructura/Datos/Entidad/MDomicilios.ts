import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon';

export class TblMaestraDomicilios extends BaseModel {
  public static table = 'tbl_maestra_domicilios';
  @column({ columnName: 'mdo_id' })
  public id?: string;
  @column({ columnName: 'mdo_nombre' })
  public nombre: string;
  @column({ columnName: 'mdo_estado' })
  public estadi: boolean;
}


