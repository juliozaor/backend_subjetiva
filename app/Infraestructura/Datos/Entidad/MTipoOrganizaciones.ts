import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class TblMaestraTipoOrganizaciones extends BaseModel {
  public static table = 'tbl_maestra_tipo_organizaciones';

  @column({ columnName: 'tor_id', isPrimary: true })
  public id: number;

  @column({ columnName: 'tor_nombre' })
  public nombre: string;

  @column({ columnName: 'tor_estado' })
  public estado: boolean;
}
