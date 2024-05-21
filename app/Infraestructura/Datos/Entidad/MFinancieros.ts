import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon';

export class TblMaestraFinancieros extends BaseModel {
  public static table = 'tbl_maestra_financieros';
  @column({ columnName: 'mfi_id' })
  public id?: string;
  @column({ columnName: 'mfi_nombre' })
  public nombre: string;
  @column({ columnName: 'mfi_estado' })
  public estado: boolean;
}


