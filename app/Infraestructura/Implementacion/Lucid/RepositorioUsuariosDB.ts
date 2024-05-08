
import { Paginador } from 'App/Dominio/Paginador';
import { MapeadorPaginacionDB } from './MapeadorPaginacionDB';
import { RepositorioUsuario } from 'App/Dominio/Repositorios/RepositorioUsuario';
import { Usuario } from 'App/Dominio/Datos/Entidades/Usuario';
import TblUsuarios from 'App/Infraestructura/Datos/Entidad/Usuario';
import { ServicioAuditoria } from 'App/Dominio/Datos/Servicios/ServicioAuditoria';
import { PayloadJWT } from '../../../Dominio/Dto/PayloadJWT';
import { ReportaMunicipios } from 'App/Dominio/Datos/Entidades/ReportaMunicipios';
export class RepositorioUsuariosDB implements RepositorioUsuario {
  private servicioAuditoria = new ServicioAuditoria();

  async obtenerMunicipiosDeUsuario(idVigilado: string): Promise<any> {
    /* const reportaMunicipiosDb = await TblReportaMunicipios.query()
    .select('tbl_reporta_municipios.*', 'tbl_departamentos.name as nombreDepartamento', 'tbl_ciudades.name as nombreCiudad')
    .leftJoin('tbl_departamentos', 'tbl_reporta_municipios.rmu_departamento', '=', 'tbl_departamentos.id')
    .leftJoin('tbl_ciudades', 'tbl_reporta_municipios.rmu_municipio', '=', 'tbl_ciudades.id')
    .where('tbl_reporta_municipios.rmu_usuario', idVigilado)
    return reportaMunicipiosDb.map( reportaMunicipioDb => reportaMunicipioDb.obtenerReportaMunicipios() ) */
   return true
  }
  
  async obtenerUsuarios (params: any): Promise<{usuarios: Usuario[], paginacion: Paginador}> {
    const usuarios: Usuario[] = []

    const consulta = TblUsuarios.query()
    if (params.rol) {
      consulta.where('usn_rol_id', params.rol)
    }
if(params.termino){
  consulta.andWhere(subquery => {
    subquery.orWhere('usn_correo', 'ilike', `%${params.termino}%`)
    subquery.orWhere('usn_nombre', 'ilike', `%${params.termino}%`)
    subquery.orWhere('usn_apellido', 'ilike', `%${params.termino}%`)
    subquery.orWhere('usn_identificacion', 'ilike', `%${params.termino}%`)
  })
}
    

    const usuariosDB = await consulta.orderBy('usn_nombre', 'asc').paginate(params.pagina, params.limite)

    usuariosDB.forEach(usuariosDB => {
      usuarios.push(usuariosDB.obtenerUsuario())
    })
    const paginacion = MapeadorPaginacionDB.obtenerPaginacion(usuariosDB)
    return {usuarios , paginacion}
  }

  async obtenerUsuarioPorId (id: string): Promise<Usuario> {
    const usuario = await TblUsuarios.findOrFail(id)
    return usuario.obtenerUsuario()
  }

  async obtenerUsuarioPorRol (rol: string): Promise<Usuario[]> {
    const usuarios: any[] = []
    const usuariosDB = await TblUsuarios.query().where('usn_rol_id', rol).orderBy('id', 'desc')
    usuariosDB.forEach(usuarioDB => {

      /* usuarios.push(usuariosDB.obtenerUsuario()) */
      usuarios.push({
      //  id: usuarioDB.id,
        nombre: usuarioDB.nombre,
        identificacion: usuarioDB.identificacion
      })
    })
    return usuarios
  }

  async obtenerUsuarioPorUsuario (nombreUsuario: string): Promise<Usuario | null>{
    const usuarioDb = await TblUsuarios.query().where('usuario', '=', nombreUsuario).first()
    if(usuarioDb){
      const usuario = usuarioDb.obtenerUsuario()
      return usuario
    }
    return null
  }

  async guardarUsuario (usuario: Usuario): Promise<Usuario> {
    let usuarioDB = new TblUsuarios()
    usuarioDB.establecerUsuarioDb(usuario)
    await usuarioDB.save()
    return usuarioDB
  }

  async actualizarUsuario (id: string, usuario: Usuario, payload?:PayloadJWT): Promise<Usuario> {
    let usuarioRetorno = await TblUsuarios.findOrFail(id)
    const usuarioAnterior = usuarioRetorno;
    usuarioRetorno.estableceUsuarioConId(usuario)
    await usuarioRetorno.save()
    
    this.servicioAuditoria.Auditar({
      accion: "Actualizar Usuario SUBJETIVO",
      modulo: "Usuarios SUBJETIVO",
      jsonAnterior: JSON.stringify(usuarioAnterior),
      jsonNuevo: JSON.stringify(usuarioRetorno),
      usuario: payload?.documento ?? '',
      descripcion: 'Usuario actualizado'
    })

    return usuarioRetorno
  }

  public async caracterizacion(idUsuario: string, idRol:string, idEncuesta?: number): Promise<any> {
    let encuestaCategorizable: boolean = false;
    let categorizado: boolean = true;
    //administrador - revisor y vigilado
    if(idRol == '007') {
      const clasificarDB = await TblClasificacionesUsuario.query().where({'clu_usuario_id':idUsuario,'clu_clasificacion_id':5}).first()
      if(!clasificarDB){
        const clasificar = new TblClasificacionesUsuario()
        clasificar.usuarioId = idUsuario
        clasificar.clasificacionId = 5
        clasificar.save()
      }

    }

    if(idRol !== '003') return { categorizado, encuestaCategorizable }


    const categorizadoBd = await TblClasificacionesUsuario.query().where('usuarioId', idUsuario).first();
    categorizado = categorizadoBd?.estado ?? false;

    
    if (idEncuesta) {
        const encuestaBd = await TblEncuestas.query().where('id', idEncuesta).first();
        if (encuestaBd && encuestaBd.categorizable === true) {
            encuestaCategorizable = true;

        }
    }


    return { categorizado, encuestaCategorizable }
}

}
