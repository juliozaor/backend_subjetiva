import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class TblMaestraTipoSocietarios extends BaseModel {
  public static table = 'tbl_maestra_tipo_societarios';

  @column({ columnName: 'tso_id', isPrimary: true })
  public id: number;

  @column({ columnName: 'tso_nombre' })
  public nombre: string;

  @column({ columnName: 'tso_estado' })
  public estado: boolean;
}
