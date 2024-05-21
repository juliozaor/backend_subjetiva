import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class TblMaestraCategoriasNs extends BaseModel {
  public static table = 'tbl_maestra_categorias_ns';

  @column({ columnName: 'cns_id', isPrimary: true })
  public id: number;

  @column({ columnName: 'cns_nombre' })
  public nombre: string;

  @column({ columnName: 'cns_estado' })
  public estado: boolean;
}
