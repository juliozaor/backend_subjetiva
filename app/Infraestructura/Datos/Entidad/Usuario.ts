import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, HasMany, HasOne, ManyToMany, belongsTo, column, hasMany, hasOne, manyToMany } from '@ioc:Adonis/Lucid/Orm';
import { Usuario } from 'App/Dominio/Datos/Entidades/Usuario';
import TblRoles from './Autorizacion/Rol';
import TblFormularios from './Formularios';
export default class TblUsuarios extends BaseModel {
  @column({ isPrimary: true, columnName: 'usn_id' })
  public id: string

  @column({ columnName: 'usn_nombre' }) public nombre: string

  @column({ columnName: 'usn_identificacion' }) public identificacion: string

  @column({ columnName: 'usn_usuario' }) public usuario: string

  @column({ columnName: 'usn_clave' }) public clave: string

  @column({ columnName: 'usn_estado' }) public estado: boolean

  @column({ columnName: 'usn_clave_temporal' }) public claveTemporal: boolean

  @column({ columnName: 'usn_telefono' }) public telefono: string

  @column({ columnName: 'usn_correo' }) public correo: string

  @column({ columnName: 'usn_apellido' }) public apellido: string

  @column({ columnName: 'usn_rol_id' }) public idRol: string
  @column.dateTime({ autoCreate: true, columnName: 'usn_creacion' }) public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'usn_actualizacion' }) public updatedAt: DateTime

  public establecerUsuarioDb(usuario: Usuario) {
    this.id = usuario.id
    this.nombre = usuario.nombre
    this.usuario = usuario.usuario
    this.clave = usuario.clave
    this.claveTemporal = usuario.claveTemporal
    this.telefono = usuario.telefono
    this.correo = usuario.correo    
    this.apellido = usuario.apellido
    this.identificacion = usuario.identificacion
    this.estado = usuario.estado
    this.idRol = usuario.idRol
  }

  public estableceUsuarioConId(usuario: Usuario) {
    this.nombre = usuario.nombre
    this.usuario = usuario.usuario
    this.clave = usuario.clave
    this.claveTemporal = usuario.claveTemporal
    this.telefono = usuario.telefono
    this.correo = usuario.correo
    this.apellido = usuario.apellido
    this.identificacion = usuario.identificacion
    this.estado = usuario.estado
    this.idRol = usuario.idRol
  }


  public obtenerUsuario(): Usuario {
    const usuario = new Usuario()
    usuario.id = this.id
    usuario.nombre = this.nombre
    usuario.usuario = this.usuario
    usuario.clave = this.clave
    usuario.estado = this.estado
    usuario.apellido = this.apellido
    usuario.identificacion = this.identificacion
    usuario.claveTemporal = this.claveTemporal
    usuario.correo = this.correo
    usuario.telefono = this.telefono
    usuario.idRol = this.idRol

    return usuario
  }

  @belongsTo(() => TblRoles, {
    localKey: 'id',
    foreignKey: 'idRol',
  })
  public rol: BelongsTo<typeof TblRoles>

  @manyToMany(() => TblFormularios, {
    localKey: 'identificacion',
    pivotForeignKey: 'fvi_vigilado_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'fvi_frm_id', 
    pivotColumns: ['fvi_estado'],
    pivotTable: 'tbl_formulario_vigilados'
  })
  public formularios: ManyToMany<typeof TblFormularios>


}
