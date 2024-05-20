import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class TblMaestraNaturalezasDs extends BaseModel {
  public static table = 'tbl_maestra_naturalezas_ds';

  @column({ columnName: 'nat_id', isPrimary: true })
  public id: number;

  @column({ columnName: 'nat_nombre' })
  public nombre: string;

  @column({ columnName: 'nat_estado' })
  public estado: boolean;
}
