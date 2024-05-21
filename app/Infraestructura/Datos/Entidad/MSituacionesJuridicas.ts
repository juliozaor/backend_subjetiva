import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class TblMaestraSituacionesJuridicas extends BaseModel {
  public static table = 'tbl_maestra_situaciones_juridicas';

  @column({ columnName: 'msj_id', isPrimary: true })
  public id: number;

  @column({ columnName: 'msj_nombre' })
  public nombre: string;

  @column({ columnName: 'msj_estado' })
  public estado: boolean;
}
