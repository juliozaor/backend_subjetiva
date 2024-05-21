import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export class TblMaestraTipoEntidades extends BaseModel {
  public static table = 'tbl_maestra_tipo_entidades';

  @column({ isPrimary: true, columnName: 'ten_id' })
  public id: number;

  @column({ columnName: 'ten_nombre' })
  public nombre: string;

  @column({ columnName: 'ten_estado' })
  public estado: boolean;
}
