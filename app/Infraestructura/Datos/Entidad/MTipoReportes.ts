import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class TblMaestraTipoReportes extends BaseModel {
  public static table = 'tbl_maestra_tipo_reportes';

  @column({ columnName: 'tre_id', isPrimary: true })
  public id: number;

  @column({ columnName: 'tre_nombre' })
  public nombre: string;

  @column({ columnName: 'tre_estado' })
  public estado: boolean;
}
