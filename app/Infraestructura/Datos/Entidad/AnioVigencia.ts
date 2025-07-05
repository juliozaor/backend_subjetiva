import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'
export class TblAnioVigencias extends BaseModel {
  public static table = 'tbl_anio_vigencias';
  @column({ columnName: 'anv_id' })
  public id?: number;
  @column({ columnName: 'anv_anio' })
  public anio: number;
  @column({ columnName: 'anv_estado' })
  public estado: boolean;
}


