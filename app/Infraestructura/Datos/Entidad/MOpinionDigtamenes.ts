import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class TblMaestraOpinionDictamenes extends BaseModel {
  public static table = 'tbl_maestra_opinion_dictamenes';

  @column({ columnName: 'mod_id', isPrimary: true })
  public id: number;

  @column({ columnName: 'mod_nombre' })
  public nombre: string;

  @column({ columnName: 'mod_estado' })
  public estado: boolean;
}
