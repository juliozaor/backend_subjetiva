import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon';

export class TblMaestraSociedades extends BaseModel {
  public static table = 'tbl_maestra_sociedades';
  @column({ columnName: 'mso_id' })
  public id?: string;
  @column({ columnName: 'mso_nombre' })
  public nombre: string;
  @column({ columnName: 'mso_estado' })
  public estadi: boolean;
}


