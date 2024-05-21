import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class TblMaestraEnfasisDictamenes extends BaseModel {
  public static table = 'tbl_maestra_enfasis_dictamenes';

  @column({ columnName: 'edi_id', isPrimary: true })
  public id: number;

  @column({ columnName: 'edi_nombre' })
  public nombre: string;

  @column({ columnName: 'edi_estado' })
  public estado: boolean;
}
