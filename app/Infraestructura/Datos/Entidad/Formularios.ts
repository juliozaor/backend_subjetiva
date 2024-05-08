import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class TblFormularios extends BaseModel {
  public static table = 'tbl_formularios';
  @column({ isPrimary: true, columnName: 'frm_id' })
  public id?: number
  @column({ columnName: 'frm_nombre' }) public nombre: string;
  @column({ columnName: 'frm_delegatura' }) public delegatura: string;
  @column({ columnName: 'frm_ruta' }) public ruta: string;
  @column({ columnName: 'frm_estado' }) public estado: boolean;



}
