import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class TblMaestraSalvedadDictamenes extends BaseModel {
  public static table = 'tbl_maestra_salvedad_dictamenes';

  @column({ columnName: 'msd_id', isPrimary: true })
  public id: number;

  @column({ columnName: 'msd_nombre' })
  public nombre: string;

  @column({ columnName: 'msd_estado' })
  public estado: boolean;
}
