import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon';

export class TblMaestraFinancierosN extends BaseModel {
  public static table = 'tbl_maestra_financieros_n';
  @column({ columnName: 'mfn_id' })
  public id?: string;
  @column({ columnName: 'mfn_nombre' })
  public nombre: string;
  @column({ columnName: 'mfn_estado' })
  public estadi: boolean;
}


