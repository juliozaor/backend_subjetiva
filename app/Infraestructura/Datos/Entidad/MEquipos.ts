import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon';

export class TblMaestraEquipos extends BaseModel {
  public static table = 'tbl_maestra_equipos';
  @column({ columnName: 'meq_id' })
  public id?: string;
  @column({ columnName: 'meq_nombre' })
  public nombre: string;
  @column({ columnName: 'meq_estado' })
  public estado: boolean;
}


