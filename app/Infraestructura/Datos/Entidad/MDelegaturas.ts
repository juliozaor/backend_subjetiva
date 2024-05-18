import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class TblMaestraDelegaturas extends BaseModel {
  public static table = 'tbl_maestra_delegaturas';

  @column({ columnName: 'mde_id', isPrimary: true })
  public id: number;

  @column({ columnName: 'mde_nombre' })
  public nombre: string;

  @column({ columnName: 'mde_estado' })
  public estado: boolean;
}
