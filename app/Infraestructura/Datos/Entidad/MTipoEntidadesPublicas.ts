import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export class TblMaestraTipoEntidadesPublicas extends BaseModel {
  public static table = 'tbl_maestra_tipo_entidades_publicas';

  @column({ isPrimary: true, columnName: 'tep_id' })
  public id: number;

  @column({ columnName: 'tep_nombre' })
  public nombre: string;

  @column({ columnName: 'tep_estado' })
  public estado: boolean;
}
