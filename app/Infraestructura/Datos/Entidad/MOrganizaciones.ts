import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon';

export class TblMaestraOrganizaciones extends BaseModel {
  public static table = 'tbl_maestra_organizaciones';
  @column({ columnName: 'mor_id' })
  public id?: string;
  @column({ columnName: 'mor_nombre' })
  public nombre: string;
  @column({ columnName: 'mor_estado' })
  public estadi: boolean;
}


