import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export class TblMaestraTipoDocumentosNs extends BaseModel {
  public static table = 'tbl_maestra_tipo_documentos_ns';

  @column({ isPrimary: true, columnName: 'tdn_id' })
  public id: number;

  @column({ columnName: 'tdn_nombre' })
  public nombre: string;

  @column({ columnName: 'tdn_estado' })
  public estado: boolean;
}
