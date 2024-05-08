import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon';

export class TblMaestraNits extends BaseModel {
  public static table = 'tbl_maestra_nits';
  @column({ columnName: 'mni_id' })
  public id?: string;
  @column({ columnName: 'mni_nombre' })
  public nombre: string;
  @column({ columnName: 'mni_estado' })
  public estadi: boolean;
}


