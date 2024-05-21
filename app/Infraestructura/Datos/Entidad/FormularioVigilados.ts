import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
import { FormularioVigilado } from 'App/Dominio/Datos/Entidades/FormularioVigilado';
import { DateTime } from 'luxon';

export default class TblFormularioVigilados extends BaseModel {
  public static table = 'tbl_formulario_vigilados';
  @column({ isPrimary: true, columnName: 'fvi_id' })
  public id?: number
  @column({ columnName: 'fvi_frm_id' }) public formularioId: number;
  @column({ columnName: 'fvi_vigilado_id' }) public vigiladoId: string;
  @column({ columnName: 'fvi_estado' }) public estado: boolean;


  @column.dateTime({ autoCreate: true, columnName: 'fvi_creacion' })
  public creacion: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'fvi_actualizacion' })
  public actualizacion: DateTime


  public establecerDatoDb(dato: FormularioVigilado) {
    this.id = dato.id
    this.vigiladoId = dato.vigiladoId
    this.formularioId = dato.formularioId
    this.estado = dato.estado
  }

  public estableceDatoConId(dato: FormularioVigilado) {
    this.vigiladoId = dato.vigiladoId
    this.formularioId = dato.formularioId
    this.estado = dato.estado
  }

  public obtenerDato(): FormularioVigilado {
    const dato = new FormularioVigilado()
    dato.id = this.id
    dato.vigiladoId = this.vigiladoId
    dato.formularioId = this.formularioId
    dato.estado = this.estado
    return dato
  }


}
