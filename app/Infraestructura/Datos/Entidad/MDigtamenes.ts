import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class TblMaestraDictamenes extends BaseModel {
  public static table = 'tbl_maestra_dictamenes';

  @column({ columnName: 'mdi_id', isPrimary: true })
  public id: number;

  @column({ columnName: 'mdi_nombre' })
  public nombre: string;

  @column({ columnName: 'mdi_estado' })
  public estado: boolean;
}
