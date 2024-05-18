import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class TblMaestraNaturalezas extends BaseModel {
  public static table = 'tbl_maestra_naturalezas';

  @column({ columnName: 'mna_id', isPrimary: true })
  public id: number;

  @column({ columnName: 'mna_nombre' })
  public nombre: string;

  @column({ columnName: 'mna_estado' })
  public estado: boolean;
}
