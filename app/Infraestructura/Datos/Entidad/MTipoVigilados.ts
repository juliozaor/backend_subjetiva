import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class TblMaestraTipoVigilados extends BaseModel {
  public static table = 'tbl_maestra_tipo_vigilados';

  @column({ columnName: 'mtv_id', isPrimary: true })
  public id: number;

  @column({ columnName: 'mtv_nombre' })
  public nombre: string;

  @column({ columnName: 'mtv_estado' })
  public estado: boolean;
}
