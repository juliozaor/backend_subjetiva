import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class TblMaestraCodigos extends BaseModel {
  public static table = 'tbl_maestra_codigos';

  @column({ columnName: 'cii_id', isPrimary: true })
  public id: number;

  @column({ columnName: 'cii_nombre' })
  public nombre: string;

  @column({ columnName: 'cii_estado' })
  public estado: boolean;
}
