import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class TblMaestraObligatoriedades extends BaseModel {
  public static table = 'tbl_maestra_obligatoriedades';

  @column({ columnName: 'mob_id', isPrimary: true })
  public id: number;

  @column({ columnName: 'mob_nombre' })
  public nombre: string;

  @column({ columnName: 'mob_estado' })
  public estado: boolean;
}

