import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class TblMaestraMonedaPresentaciones extends BaseModel {
  public static table = 'tbl_maestra_moneda_presentaciones';

  @column({ columnName: 'mmp_id', isPrimary: true })
  public id: number;

  @column({ columnName: 'mmp_nombre' })
  public nombre: string;

  @column({ columnName: 'mmp_estado' })
  public estado: boolean;
}
