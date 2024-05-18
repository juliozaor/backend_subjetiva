import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class TblMaestraSubordinadas extends BaseModel {
  public static table = 'tbl_maestra_subordinadas';

  @column({ columnName: 'msu_id', isPrimary: true })
  public id: number;

  @column({ columnName: 'msu_nombre' })
  public nombre: string;

  @column({ columnName: 'msu_estado' })
  public estado: boolean;
}
