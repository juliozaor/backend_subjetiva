import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class TblMaestraHipotesisMarchas extends BaseModel {
  public static table = 'tbl_maestra_hipotesis_marchas';

  @column({ columnName: 'mhm_id', isPrimary: true })
  public id: number;

  @column({ columnName: 'mhm_nombre' })
  public nombre: string;

  @column({ columnName: 'mhm_estado' })
  public estado: boolean;
}
