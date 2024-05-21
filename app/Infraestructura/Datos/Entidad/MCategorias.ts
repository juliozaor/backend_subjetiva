import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class TblMaestraCategorias extends BaseModel {
  public static table = 'tbl_maestra_categorias';

  @column({ columnName: 'mca_id', isPrimary: true })
  public id: number;

  @column({ columnName: 'mca_nombre' })
  public nombre: string;

  @column({ columnName: 'mca_estado' })
  public estado: boolean;
}
