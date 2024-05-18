import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class TblMaestraTipoEntidadesNs extends BaseModel {
  public static table = 'tbl_maestra_tipo_entidadesNs';

  @column({ columnName: 'tet_id', isPrimary: true })
  public id: number;

  @column({ columnName: 'tet_nombre' })
  public nombre: string;

  @column({ columnName: 'tet_estado' })
  public estado: boolean;
}
