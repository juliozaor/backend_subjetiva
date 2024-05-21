import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class TblMaestraTipoDocumentos extends BaseModel {
  public static table = 'tbl_maestra_tipo_documentos';

  @column({ isPrimary: true, columnName: 'mtd_id' })
  public id: number;

  @column({ columnName: 'mtd_nombre' })
  public nombre: string;

  @column({ columnName: 'mtd_estado' })
  public estado: boolean;
}